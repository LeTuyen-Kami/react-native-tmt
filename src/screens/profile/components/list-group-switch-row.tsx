import { ListGroup, Switch, cn } from "heroui-native";
import { View } from "react-native";
import type { WithTimingConfig } from "react-native-reanimated";

import { ROW_BORDER, TITLE_EMPHASIS } from "../constants";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onSelectedChange: (v: boolean) => void;
  isLast?: boolean;
  switchAnimation: {
    backgroundColor: {
      value: [string, string];
      timingConfig: WithTimingConfig;
    };
  };
};

export function ListGroupSwitchRow({
  icon,
  title,
  description,
  selected,
  onSelectedChange,
  isLast,
  switchAnimation,
}: Props) {
  return (
    <View
      className={cn("flex-row items-center gap-3 p-4", !isLast && ROW_BORDER)}
    >
      <ListGroup.ItemPrefix className="justify-center">
        {icon}
      </ListGroup.ItemPrefix>
      <ListGroup.ItemContent>
        <ListGroup.ItemTitle className={TITLE_EMPHASIS} numberOfLines={1}>
          {title}
        </ListGroup.ItemTitle>
        <ListGroup.ItemDescription numberOfLines={2}>
          {description}
        </ListGroup.ItemDescription>
      </ListGroup.ItemContent>
      <ListGroup.ItemSuffix>
        <Switch
          isSelected={selected}
          onSelectedChange={onSelectedChange}
          animation={switchAnimation}
        />
      </ListGroup.ItemSuffix>
    </View>
  );
}
