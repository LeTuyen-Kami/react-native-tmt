import { FlashList } from "@shopify/flash-list";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { STATUS_VARIANT } from "@/utils/constants";
import FilterBar, { type FilterBarValue } from "./filter-bar";
import Header from "./header";
import HomeItem, { type HomeMachineItemProps } from "./item";
import Sumary from "./sumary";
import SearchBar from "./search-bar";

const DEMO_LINES: HomeMachineItemProps[] = [
  {
    id: "a1",
    status: STATUS_VARIANT.ISSUE,
    title: "Press Unit A1",
    subtitle: "High-tonnage hydraulic press",
    unitsToday: "842",
    efficiency: "62%",
    uptime: "18.5h",
    alertMessage: "Pressure drop detected",
  },
  {
    id: "c2",
    status: STATUS_VARIANT.MAINTENANCE,
    title: "Welding Station C2",
    subtitle: "Automated MIG welding cell",
    unitsToday: "—",
    efficiency: "—",
    uptime: "0h",
  },
  {
    id: "d1",
    status: STATUS_VARIANT.RUNNING,
    title: "Assembly Line D1",
    subtitle: "Main product assembly conveyor",
    unitsToday: "1,240",
    efficiency: "96%",
    uptime: "23h",
  },
];

const HomeScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const headerHeight = useRef(0);
  const headerRef = useRef<View>(null!);
  const [filter, setFilter] = useState<FilterBarValue>("all");

  const [data] = useState<HomeMachineItemProps[]>(() =>
    [...Array(30)].map((_, index) => {
      const base = DEMO_LINES[index % DEMO_LINES.length]!;
      return { ...base, id: `${base.id}-${index}` };
    })
  );

  const filterCounts = useMemo(() => {
    const counts = {
      all: data.length,
      [STATUS_VARIANT.RUNNING]: 0,
      [STATUS_VARIANT.MAINTENANCE]: 0,
      [STATUS_VARIANT.ISSUE]: 0,
    };
    for (const item of data) {
      counts[item.status]++;
    }
    return counts;
  }, [data]);

  const flashlistData = useMemo(() => {
    const machines =
      filter === "all" ? data : data.filter((item) => item.status === filter);
    return [
      {
        type: "sumary" as const,
      },
      {
        type: "search" as const,
      },
      {
        type: "filter" as const,
      },
      ...machines.map((item) => ({
        ...item,
        type: "machine" as const,
      })),
    ];
  }, [data, filter]);

  const renderItem = ({
    item,
    index,
  }: {
    item:
      | HomeMachineItemProps
      | { type: "sumary" }
      | { type: "search" }
      | { type: "filter" };
    index: number;
  }) => {
    if ("type" in item && item.type === "search") {
      return <SearchBar />;
    }

    if ("type" in item && item.type === "sumary") {
      return <Sumary counts={filterCounts} />;
    }

    if ("type" in item && item.type === "filter") {
      return (
        <FilterBar
          selected={filter}
          onSelect={setFilter}
          counts={filterCounts}
        />
      );
    }

    return <HomeItem {...item} index={index} />;
  };

  useLayoutEffect(() => {
    if (headerRef.current) {
      headerRef.current?.measure((x, y, width, height, pageX, pageY) => {
        headerHeight.current = height;
      });
    }
  }, []);

  const getItemType = (
    item:
      | HomeMachineItemProps
      | { type: "sumary" }
      | { type: "search" }
      | { type: "filter" }
  ) => {
    if ("type" in item) {
      return item.type;
    }
    return "machine";
  };

  return (
    <View className="flex-1">
      <Header ref={headerRef} />
      <View style={{ flex: 1, top: top }}>
        <FlashList
          data={flashlistData}
          extraData={{ filter, filterCounts }}
          getItemType={getItemType}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingTop: headerHeight.current + 40,
            paddingBottom: bottom + 64,
          }}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
