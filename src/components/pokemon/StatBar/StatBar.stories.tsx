import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatBar } from "./StatBar";
import { TYPE_COLORS } from "@/lib/pokemon-format";

const meta = {
  title: "Pokemon/StatBar",
  component: StatBar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 255, step: 1 },
      description: "Base stat value (0–255).",
    },
    color: { control: "color" },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Atk", value: 84 },
};

export const HighStat: Story = {
  args: { label: "Sp. Atk", value: 130, color: TYPE_COLORS.psychic },
};

export const LowStat: Story = {
  args: { label: "Speed", value: 30, color: TYPE_COLORS.normal },
};

export const StatBlock: Story = {
  args: { label: "HP", value: 45 },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-2.5">
      <StatBar label="HP" value={78} color={TYPE_COLORS.fire} />
      <StatBar label="Atk" value={84} color={TYPE_COLORS.fire} />
      <StatBar label="Def" value={78} color={TYPE_COLORS.fire} />
      <StatBar label="Sp. Atk" value={109} color={TYPE_COLORS.fire} />
      <StatBar label="Sp. Def" value={85} color={TYPE_COLORS.fire} />
      <StatBar label="Speed" value={100} color={TYPE_COLORS.fire} />
    </div>
  ),
};
