import { openai } from "@/lib/openai";

interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

export async function strict_output<T = any>(
  system_prompt: string,
  user_prompts: string | string[],
  output_format: OutputFormat,
  model: string = "gpt-4-1106-preview",
  temperature: number = 1
): Promise<T> {
  const list_input: boolean = Array.isArray(user_prompts);

  const prompt: string =
    system_prompt + `\nOutput format: ${JSON.stringify(output_format)}`;

  let responses = [];

  if (list_input) {
    for (const user_prompt of user_prompts) {
      const response = await sendPrompt(
        prompt,
        user_prompt,
        model,
        temperature
      );
      responses.push(response);
    }
  } else {
    responses.push(await sendPrompt(prompt, user_prompts, model, temperature));
  }

  console.log("OUTPUT: ", responses);
  return responses as T;
}

async function sendPrompt(
  prompt: string,
  user_prompt: string,
  model: string,
  temperature: number
) {
  const response = await openai.chat.completions.create({
    temperature: temperature,
    model: model,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          prompt +
          " Make sure that data you return are properly formatted JSON.",
      },
      { role: "user", content: user_prompt },
    ],
  });

  try {
    return JSON.parse(response.choices[0].message?.content ?? "");
  } catch (e) {
    console.error("Error parsing JSON response: ", e);
    return null;
  }
}
