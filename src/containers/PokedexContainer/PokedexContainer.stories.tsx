import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { PokedexContainer } from "./PokedexContainer";
import { errorHandlers, handlers, loadingHandlers } from "@/mocks/handlers";

const meta = {
  title: "Containers/PokedexContainer",
  component: PokedexContainer,
  parameters: { layout: "fullscreen" },
  args: { onSelect: fn(), pageSize: 5 },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-5xl p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PokedexContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { msw: { handlers } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText("Charizard")).toBeInTheDocument();
    await expect(canvas.getByText("Pikachu")).toBeInTheDocument();
  },
};

export const Loading: Story = {
  parameters: { msw: { handlers: loadingHandlers } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByTestId("pokemon-grid-loading")
    ).toBeInTheDocument();
  },
};

export const ApiError: Story = {
  parameters: { msw: { handlers: errorHandlers } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByRole("alert")).toHaveTextContent(
      /failed to load/i
    );
  },
};

export const SearchInteraction: Story = {
  parameters: { msw: { handlers } },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Grid loads all fixtures", async () => {
      await expect(await canvas.findByText("Charizard")).toBeInTheDocument();
      await expect(canvas.getByText("Snorlax")).toBeInTheDocument();
    });

    await step("Filtering hides non-matching Pokémon", async () => {
      await userEvent.type(
        canvas.getByRole("searchbox", { name: /search pokémon/i }),
        "char"
      );
      await expect(canvas.getByText("Charizard")).toBeInTheDocument();
      await expect(canvas.queryByText("Snorlax")).not.toBeInTheDocument();
    });
  },
};
