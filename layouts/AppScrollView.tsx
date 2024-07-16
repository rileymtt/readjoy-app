import { View } from "@/components/Themed";
import React from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  ViewProps,
} from "react-native";

export default function AppScrollView(
  props: ViewProps & {
    isMain?: boolean;
    refreshing?: boolean;
    onRefresh?: () => void;
  }
) {
  return (
    <View style={[styles.container]}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          props.onRefresh ? (
            <RefreshControl
              refreshing={props.refreshing || false}
              onRefresh={props.onRefresh}
            />
          ) : undefined
        }
      >
        {/* <View style={props.isMain ? styles.mainSpace : styles.subSpace} /> */}
        {props.children}
        {/* <View style={props.isMain ? styles.mainSpace : styles.subSpace} /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  mainSpace: {
    height: 70,
  },
  subSpace: {
    height: 20,
  },
});
