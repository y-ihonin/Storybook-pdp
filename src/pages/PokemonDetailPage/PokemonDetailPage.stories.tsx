import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { PokemonDetailPage } from "./PokemonDetailPage";
import { handlers } from "@/mocks/handlers";

const meta = {
  title: "Pages/PokemonDetailPage",
  component: PokemonDetailPage,
  parameters: {
    layout: "fullscreen",
    msw: { handlers },
  },
  args: { idOrName: 6, onBack: fn() },
} satisfies Meta<typeof PokemonDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const BackNavigation: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText("Charizard");

    await userEvent.click(
      canvas.getByRole("button", { name: /back to pokédex/i })
    );
    await expect(args.onBack).toHaveBeenCalledTimes(1);
  },
};
