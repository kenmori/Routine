import React from "react";
import { Link } from "../common/Routing";
import { FlatList, View, Text, StyleSheet } from "react-native";

const Header = () => (
  <View>
    {console.log(`[INFO] this.state.activeTab: `)}
    <FlatList
      data={[{ key: "about" }, { key: "scedule" }]}
      renderItem={({ item }) => (
        <Link to={`/${item.key}`}>
          <Text>{item.key}</Text>
        </Link>
      )}
    />
  </View>
);

export { Header };
