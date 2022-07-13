import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Home: React.FC = ({ navigation }: any) => {
  useEffect(() => {
    fetchRandomWord();
  }, []);

  const [showWord, setShowWord] = useState<IShowWordProps>();
  const [data, setData] = useState({ word: "" });

  const handleChange = (key: keyof State) => {
    return (text: string) => {
      setData({ ...data, [key]: text });
    };
  };
  const handleSubmit = async () => {
    navigation.navigate("Dictionary", { data });
    setData({ word: "" });
  };

  const fetchRandomWord = async () => {
    const res = await axios.get(`https://random-words-api.vercel.app/word`);
    setShowWord(res.data[0]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          value={data.word}
          onChangeText={handleChange("word")}
          style={styles.input}
          placeholder="Search here..."
          placeholderTextColor="black"
        />
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.button}
          activeOpacity={0.7}
          disabled={data.word === ""}
        >
          <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.word}>Word of the day!</Text>
      <Text style={styles.wordMain}>{showWord?.word}</Text>
      <Text style={styles.word}>{showWord?.pronunciation}</Text>
      <Text style={styles.text}>{showWord?.definition}</Text>
    </View>
  );
};

export default Home;

interface IShowWordProps {
  definition: string;
  pronunciation: string;
  word: string;
}

type State = {
  word: string;
};

interface IMeaning {
  antonyms: string[];
  definitions: IDefinition[];
  synonyms: string[];
}

interface IDefinition {
  definition: string;
  example: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    flexDirection: "row",
    marginBottom: 40,
  },
  word: {
    fontSize: 25,
    color: "black",
    margin: 10,
  },
  wordMain: {
    fontSize: 30,
    color: "pink",
    margin: 10,
  },
  text: {
    fontSize: 25,
    color: "black",
    margin: 10,
  },
  input: {
    padding: 15,
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 15,
    borderRadius: 5,
    color: "black",
    fontSize: 16,
    height: "100%",
  },
  button: {
    backgroundColor: "pink",
    padding: 5,
    borderRadius: 5,
    fontWeight: "500",
    marginLeft: 10,
  },
});
