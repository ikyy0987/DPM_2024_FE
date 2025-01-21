import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

const NovelDetailScreen = () => {
  const { title, author, content, cover } = useLocalSearchParams();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: cover }} style={styles.coverImage} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>by {author}</Text>
      <Text style={styles.content}>{content}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  coverImage: { width: "100%", height: 300, resizeMode: "contain", marginBottom: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  author: { fontSize: 18, color: "#555", marginBottom: 16 },
  content: { fontSize: 16, lineHeight: 24 },
});

export default NovelDetailScreen;
