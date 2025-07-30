
import { GoogleGenAI, Type } from "@google/genai";
import type { SquareValue } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getAiMove(board: SquareValue[]): Promise<number> {
    const prompt = `You are an expert Tic Tac Toe AI. The board is a 9-element array representing a 3x3 grid. Indices are 0-8 (0-2 top row, 3-5 middle, 6-8 bottom). 'X' is the human player. 'O' is you. 'null' represents an empty square. Your goal is to win, or if not possible, draw. The current board is: [${board.map(s => s ? `"${s}"` : 'null').join(', ')}]. It is your turn to play as 'O'. Choose the best move and provide the index (0-8) of the empty square you want to play on.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        move: {
                            type: Type.INTEGER,
                            description: "The index of the square to play on (0-8). Must be an empty square.",
                        },
                    },
                    required: ["move"],
                },
                thinkingConfig: { thinkingBudget: 0 }
            },
        });

        const jsonResponse = JSON.parse(response.text);
        const move = jsonResponse.move;

        if (typeof move === 'number' && move >= 0 && move <= 8 && board[move] === null) {
            return move;
        } else {
            console.warn(`AI returned an invalid move: ${move}. Falling back.`);
            const emptySquares = board.map((v, i) => v === null ? i : null).filter((v): v is number => v !== null);
            return emptySquares[Math.floor(Math.random() * emptySquares.length)];
        }
    } catch (error) {
        console.error("Error getting AI move:", error);
        console.log("Gemini API call failed. Falling back to a random available move.");
        const emptySquares = board.map((v, i) => v === null ? i : null).filter((v): v is number => v !== null);
        
        if (emptySquares.length > 0) {
            return emptySquares[Math.floor(Math.random() * emptySquares.length)];
        }
        
        return 0; // Should not be reached in a normal game flow
    }
}
