import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Heart } from "lucide-react";
import { Button } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { children: "Button", onClick: fn() },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
    },
    size: { control: "select", options: ["default", "sm", "lg", "icon"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Destructive: Story = { args: { variant: "destructive" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Ghost: Story = { args: { variant: "ghost" } };

export const WithIcon: Story = {
  args: {
    variant: "outline",
    children: (
      <>
        <Heart /> Favorite
      </>
    ),
  },
};

export const Matrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const variants = [
      "default",
      "secondary",
      "destructive",
      "outline",
      "ghost",
      "link",
    ] as const;
    return (
      <div className="flex flex-col gap-3">
        {variants.map((variant) => (
          <div key={variant} className="flex items-center gap-3">
            <Button variant={variant} size="sm">
              {variant}
            </Button>
            <Button variant={variant}>{variant}</Button>
            <Button variant={variant} size="lg">
              {variant}
            </Button>
          </div>
        ))}
      </div>
    );
  },
};
