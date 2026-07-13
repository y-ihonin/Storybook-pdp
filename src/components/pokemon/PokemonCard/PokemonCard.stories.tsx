import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { PokemonCard } from "./PokemonCard";
import { bulbasaur, charizard, pikachu } from "@/mocks/pokemon";

const meta = {
  title: "Pokemon/PokemonCard",
  component: PokemonCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    onSelect: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-56">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PokemonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { pokemon: charizard },
};

export const DualType: Story = {
  args: { pokemon: bulbasaur },
};

export const NonInteractive: Story = {
  args: { pokemon: pikachu, onSelect: undefined },
};

export const ClicksAreReported: Story = {
  args: { pokemon: pikachu },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Card exposes an accessible button role", async () => {
      const card = canvas.getByRole("button", { name: /view pikachu/i });
      await expect(card).toBeInTheDocument();
    });

    await step("Clicking the card reports the selection", async () => {
      await userEvent.click(canvas.getByRole("button", { name: /view pikachu/i }));
      await expect(args.onSelect).toHaveBeenCalledTimes(1);
      await expect(args.onSelect).toHaveBeenCalledWith(pikachu);
    });
  },
};
