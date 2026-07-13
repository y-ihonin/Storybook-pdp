import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
import { PokemonDetailContainer } from "./PokemonDetailContainer";
import { errorHandlers, handlers, loadingHandlers } from "@/mocks/handlers";

const meta = {
  title: "Containers/PokemonDetailContainer",
  component: PokemonDetailContainer,
  parameters: { layout: "fullscreen" },
  args: { idOrName: 6, onBack: fn() },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PokemonDetailContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { msw: { handlers } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText("Charizard")).toBeInTheDocument();
  },
};

export const ByName: Story = {
  args: { idOrName: "gengar" },
  parameters: { msw: { handlers } },
};

export const Loading: Story = {
  parameters: { msw: { handlers: loadingHandlers } },
};

export const NotFound: Story = {
  args: { idOrName: 9999 },
  parameters: { msw: { handlers: errorHandlers } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByRole("alert")).toBeInTheDocument();
  },
};
