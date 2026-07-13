import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { SearchBar } from "./SearchBar";

const meta = {
  title: "Pokemon/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { value: "", onChange: fn() },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithValue: Story = {
  args: { value: "char" },
};

export const Typing: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <SearchBar
        {...args}
        value={value}
        onChange={(v) => {
          setValue(v);
          args.onChange(v);
        }}
      />
    );
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("searchbox", { name: /search pokémon/i });

    await userEvent.type(input, "pikachu");

    await expect(input).toHaveValue("pikachu");
    await expect(args.onChange).toHaveBeenCalledTimes("pikachu".length);
  },
};
