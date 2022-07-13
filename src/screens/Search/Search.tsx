import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";

type State = {
  word: string;
};

const Search: React.FC = ({ navigation }: any) => {
  const [data, setData] = useState({ word: "" });
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);
  const handleChange = (key: keyof State) => {
    return (text: string) => {
      setError("");
      setData({ ...data, [key]: text });
    };
  };
  const handleSubmit = async () => {
    await axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${data.word}`)
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => setError(err.response.data.message));
    setData({ word: "" });
  };

  const defenitions = results?.map((item: IResults) =>
    item.meanings.map((item: IMeaning) =>
      item.defenitions.map((item: IDefenition) => item)
    )
  );

  console.log("this--------->>>", defenitions);
  return results.length ? (
    <View style={styles.container}></View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <TextInput
        value={data.word}
        onChangeText={handleChange("word")}
        style={styles.input}
        placeholder="Search here..."
        placeholderTextColor="black"
      />
      {error !== "" && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.button}
        activeOpacity={0.7}
        disabled={data.word === ""}
      >
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Search;

interface IResults {
  meanings: IMeaning[];
}

interface IMeaning {
  antonyms: string[];
  defenitions: IDefenition[];
  synonyms: string[];
}

interface IDefenition {
  definition: string;
  example: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    padding: 15,
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 15,
    borderRadius: 5,
    color: "black",
    fontSize: 16,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  error: {
    color: "red",
  },
});
