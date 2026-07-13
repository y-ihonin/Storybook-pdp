import type { Meta, StoryObj } from "@storybook/react-vite";
import { TypeBadge } from "./TypeBadge";
import { TYPE_COLORS } from "@/lib/pokemon-format";

const ALL_TYPES = Object.keys(TYPE_COLORS) as (keyof typeof TYPE_COLORS)[];

const meta = {
  title: "Pokemon/TypeBadge",
  component: TypeBadge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A coloured pill for a Pokémon type. Colours come from a single shared `TYPE_COLORS` map so every badge stays consistent.",
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ALL_TYPES,
      description: "Which Pokémon type to display.",
    },
  },
} satisfies Meta<typeof TypeBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { type: "fire" },
};

export const Grass: Story = {
  args: { type: "grass" },
};

export const AllTypes: Story = {
  args: { type: "normal" },
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div className="flex max-w-md flex-wrap gap-2">
      {ALL_TYPES.map((type) => (
        <TypeBadge key={type} type={type} />
      ))}
    </div>
  ),
};
