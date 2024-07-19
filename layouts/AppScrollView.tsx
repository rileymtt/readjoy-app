import React from "react";
import {
  RefreshControl,
  SafeAreaView,
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
    <SafeAreaView style={[styles.container]}>
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
        {props.children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  mainSpace: {
    height: 70,
  },
  subSpace: {
    height: 20,
  },
});
