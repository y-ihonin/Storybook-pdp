import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { PokemonGrid } from "./PokemonGrid";
import { mockPokemonList } from "@/mocks/pokemon";

const meta = {
  title: "Pokemon/PokemonGrid",
  component: PokemonGrid,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { onSelect: fn() },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-5xl p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PokemonGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loaded: Story = {
  args: { pokemon: mockPokemonList },
};

export const Loading: Story = {
  args: { pokemon: [], loading: true, skeletonCount: 8 },
};

export const Empty: Story = {
  args: { pokemon: [], emptyMessage: 'No Pokémon match "mewthree".' },
};

export const SingleResult: Story = {
  args: { pokemon: mockPokemonList.slice(0, 1) },
};
