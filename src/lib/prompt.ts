import { openai } from "@/lib/openai";

export async function create_prompt(
    system_prompt: string,
    user_prompt: string | string[],
    default_category: string = "",
    output_value_only: boolean = false,
    model: string = "gpt-4-1106-preview",
) {
    const list_input: boolean = Array.isArray(user_prompt);
    let error_msg: string = "";

    const response = await openai.chat.completions.create({
        temperature: 1,
        model: model,
        messages: [
            {
                role: "system",
                content: system_prompt,
            },
            { role: "user", content: user_prompt.toString() },
        ],
        
    });

    let res: string =
    response.choices[0].message?.content?.replace(/'/g, '"') ?? "";

    res = res.replace(/(\w)"(\w)/g, "$1'$2");
}