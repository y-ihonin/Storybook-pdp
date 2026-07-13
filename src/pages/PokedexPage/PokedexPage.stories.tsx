import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
import { PokedexPage } from "./PokedexPage";
import { handlers } from "@/mocks/handlers";

const meta = {
  title: "Pages/PokedexPage",
  component: PokedexPage,
  parameters: {
    layout: "fullscreen",
    msw: { handlers },
  },
  args: { onSelectPokemon: fn() },
} satisfies Meta<typeof PokedexPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: /explore the pokédex/i })
    ).toBeInTheDocument();
    await expect(await canvas.findByText("Bulbasaur")).toBeInTheDocument();
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
