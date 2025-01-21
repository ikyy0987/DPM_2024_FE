import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  Alert,
} from "react-native";
import { useTodos } from "@/context/TodoContext";

const TodosScreen = () => {
  const { todos, removeTodo } = useTodos();

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Do you want to delete this novel?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => removeTodo(id), // Menghapus item dari daftar todos
        },
      ]
    );
  };

  const renderTodo = ({ item }) => (
    <View style={styles.todoContainer}>
      <Image source={{ uri: item.cover }} style={styles.bookCover} />
      <View style={styles.bookInfo}>
        <Text style={styles.novelTitle}>{item.title}</Text>
        <Text style={styles.novelAuthor}>{item.author}</Text>
      </View>
      <Button
        title="Delete"
        color="red"
        onPress={() => handleDelete(item.id)} // Memanggil fungsi handleDelete
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No books in Todos.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  list: { paddingBottom: 16 },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  novelCover: { width: 60, height: 90, borderRadius: 4, marginRight: 12 },
  novelInfo: { flex: 1 },
  novelTitle: { fontSize: 16, fontWeight: "bold" },
  novelAuthor: { fontSize: 14, color: "#555" },
  emptyMessage: { fontSize: 16, color: "#aaa", textAlign: "center", marginTop: 20 },
});

export default TodosScreen;
