import React, { FC } from "react";
import { View, Text } from "react-native";
import { COLORS, FONT_WEIGHT, SPACING } from "@styles/variables";
import Container from "@components/containers";

const GRID_ROWS = 4;
const GRID_COLS = 4;
const TOTAL_ITEMS = GRID_ROWS * GRID_COLS;
const CENTER_INDEX = Math.floor(TOTAL_ITEMS / 2);

const Banner: FC = () => {
  return (
    <Container
      style={{
        flexDirection: "column",
        flexWrap: "wrap",
        backgroundColor: COLORS.primary,
        padding: SPACING.large,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "center",
        }}
      >
        {Array.from({ length: TOTAL_ITEMS }).map((_, index) => (
          <View
            key={index}
            style={{
              width: `${100 / GRID_COLS}%`,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: SPACING.small,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight:
                  index === CENTER_INDEX
                    ? FONT_WEIGHT.bold
                    : FONT_WEIGHT.regular,
                color: index === CENTER_INDEX ? "#111" : "#111",
                opacity: index === CENTER_INDEX ? 1 : 0.2,
                textAlign: "center",
                flexShrink: 1,
                flexWrap: "nowrap",
              }}
              numberOfLines={1}
              ellipsizeMode="clip"
            >
              NEARLY
            </Text>
          </View>
        ))}
      </View>
    </Container>
  );
};

export default Banner;
