import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { useNavigation } from "expo-router";
import { useTodos } from "@/context/TodoContext";
import { addTodo } from './path/to/file';


const novelData = [
  { 
    id: '1', 
    title: 'One Hundred Years of Solitude', 
    author: 'Gabriel García Márquez', 
    content: 'A landmark in the genre of magical realism, this novel tells the multi-generational story of the Buendía family in the fictional town of Macondo, exploring love, power, solitude, and the passage of time.',
    cover: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/One_Hundred_Years_of_Solitude_-_first_edition.jpg'
  },
  { 
    id: '2', 
    title: 'The Brothers Karamazov', 
    author: 'Fyodor Dostoevsky', 
    content: 'This philosophical novel explores the moral struggles between faith, doubt, and reason, telling the story of three brothers who are caught in a web of family conflict, love, and murder.',
    cover: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/The_Brothers_Karamazov_first_edition_cover.jpg'
  },
  { 
    id: '3', 
    title: 'Don Quixote', 
    author: 'Miguel de Cervantes', 
    content: 'A tale of an aging knight, Don Quixote, who sets off on a series of adventures with his squire Sancho Panza, embracing the themes of idealism, chivalry, and the clash with reality.',
    cover: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Don_Quixote_1st_edition_cover.jpg'
  },
  { 
    id: '4', 
    title: 'War and Peace', 
    author: 'Leo Tolstoy', 
    content: 'An epic historical novel set during the Napoleonic Wars, exploring themes of fate, history, and the impact of the wars on Russian aristocracy and common people.',
    cover: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/War_and_Peace%2C_1869_edition_-_title_page.jpg'
  },
  { 
    id: '5', 
    title: 'Moby-Dick', 
    author: 'Herman Melville', 
    content: 'The story of Captain Ahab’s obsessive quest to hunt the great white whale, Moby Dick, examining themes of fate, revenge, and the nature of humanity.',
    cover: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Moby-Dick_FE_title_page.jpg'
  },
  { 
    id: '6', 
    title: 'The Catcher in the Rye', 
    author: 'J.D. Salinger', 
    content: 'A coming-of-age novel centered around Holden Caulfield, a disillusioned teenager who struggles with the complexities of adulthood, identity, and isolation.',
    cover: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/The_Catcher_in_the_Rye.jpg'
  },
  { 
    id: '7', 
    title: '1984', 
    author: 'George Orwell', 
    content: 'A dystopian novel set in a totalitarian society under constant surveillance by the government, exploring themes of censorship, propaganda, and the loss of individual freedoms.',
    cover: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/1984first.jpg'
  },
  { 
    id: '8', 
    title: 'The Great Gatsby', 
    author: 'F. Scott Fitzgerald', 
    content: 'A story set in the Jazz Age of 1920s America, chronicling the life of the mysterious Jay Gatsby and his unrequited love for Daisy Buchanan, exploring themes of wealth, love, and the American Dream.',
    cover: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/The_Great_Gatsby_1925_jacket.svg'
  },
  { 
    id: '9', 
    title: 'Pride and Prejudice', 
    author: 'Jane Austen', 
    content: 'A classic novel about the life of Elizabeth Bennet, who navigates social expectations, love, and marriage in early 19th-century England.',
    cover: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Pride_and_Prejudice_1st_edition.jpg'
  },
  { 
    id: '10', 
    title: 'Les Misérables', 
    author: 'Victor Hugo', 
    content: 'A sweeping historical novel set in post-revolutionary France, following the struggles of ex-convict Jean Valjean and his pursuit of redemption amidst themes of justice, love, and revolution.',
    cover: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Les_Mis%C3%A9rables_1st_ed._title_page.jpg'
  }
];

  

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { addTodo } = useTodos();
  const navigation = useNavigation();

  const filteredNovel = novelData.filter((novel) =>
    novel.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToTodos = (novel) => {
    console.log("Adding to Todos:", novel); // Debugging log
    addTodo(novel);
    Alert.alert("Success", `${novel.title} has been added to Todos!`);
  };
  

  const renderNovel = ({ item }) => (
    <View style={styles.novelContainer}>
      <TouchableOpacity
       style={styles.novelDetails}
       onPress={() =>
         navigation.navigate("novel-detail", {
           id: item.id,
           title: item.title,
           author: item.author,
           content: item.content,
           cover: item.cover,
         })
       }
     >
       <Image source={{ uri: item.cover }} style={styles.novelCover} />
       <View style={styles.novelInfo}>
         <Text style={styles.novelTitle}>{item.title}</Text>
         <Text style={styles.novelAuthor}>{item.author}</Text>
       </View>
      </TouchableOpacity>
      <Button title="Add" onPress={() => handleAddToTodos(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search novels..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredNovel}
        renderItem={renderNovel}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <Button title="Go to Todos" onPress={() => navigation.navigate("index")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  searchBar: { height: 40, borderColor: "#ccc", borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, marginBottom: 16 },
  list: { paddingBottom: 16 },
  novelContainer: { flexDirection: "row", alignItems: "center", marginBottom: 16, padding: 8, backgroundColor: "#f9f9f9", borderRadius: 8 },
  novelDetails: { flex: 1, flexDirection: "row", alignItems: "center" },
  novelCover: { width: 60, height: 90, borderRadius: 4, marginRight: 12 },
  novelInfo: { flex: 1 },
  novelTitle: { fontSize: 16, fontWeight: "bold" },
  novelAuthor: { fontSize: 14, color: "#555" },
});

export default ExploreScreen;
