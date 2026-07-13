import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { PokemonDetail } from "./PokemonDetail";
import { charizard, gengar, snorlax } from "@/mocks/pokemon";

const meta = {
  title: "Pokemon/PokemonDetail",
  component: PokemonDetail,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { onBack: fn() },
} satisfies Meta<typeof PokemonDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Charizard: Story = {
  args: { pokemon: charizard },
};

export const Gengar: Story = {
  args: { pokemon: gengar },
};

export const Snorlax: Story = {
  args: { pokemon: snorlax },
};

export const SwitchesTabs: Story = {
  args: { pokemon: charizard },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Stats tab is shown by default", async () => {
      await expect(canvas.getByText("Total")).toBeInTheDocument();
    });

    await step("Switching to About reveals abilities", async () => {
      await userEvent.click(canvas.getByRole("tab", { name: /about/i }));
      await expect(await canvas.findByText("Blaze")).toBeInTheDocument();
      await expect(canvas.getByText("Solar Power")).toBeInTheDocument();
    });
  },
};
