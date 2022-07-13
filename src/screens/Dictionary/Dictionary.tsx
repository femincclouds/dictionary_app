import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import SoundPlayer from "react-native-sound-player";
import Sound from "react-native-sound";

const Dictionary = () => {
  const route = useRoute();
  const { data }: any = route.params;
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>("");

  useEffect(() => {
    fetchWordMeaning();
  }, []);

  const fetchWordMeaning = async () => {
    await axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${data.word}`)
      .then((res) => {
        console.log("res====>>>", res);
        setResults(res.data[0].meanings);
        setAudioUrl(res.data[0].phonetics[0].audio);
      })
      .catch((err) => setError(err.response.data.message));
  };
  const meaningArray = results.map((item: IMeaning) =>
    item.definitions.map((item: IDefinition) => item.definition)
  );
  const partsOfSpeech = results.map((item: IMeaning) => item.partOfSpeech);

  const playAudio = async () => {
    console.log("audioUrl--->>>", audioUrl);
    try {
      !!audioUrl && SoundPlayer.playUrl(audioUrl);
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  };

  //   const handleAudio = () => {
  //     const sound = new Sound(audioUrl, Sound.MAIN_BUNDLE, (error) => {
  //       if (error) {
  //         console.log("Failed to load the sound", error);
  //         alert("failed to load the sound !!");
  //         return;
  //       }
  //       sound.play(() => sound.release());
  //     });
  //     sound.play();
  //   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.word}</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => setShowMore(!showMore)}
          style={styles.button}
          activeOpacity={0.7}
        >
          <Text style={styles.text}>show more</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={playAudio}
          style={styles.button}
          activeOpacity={0.7}
        >
          <Text style={styles.text}>audio</Text>
        </TouchableOpacity>
      </View>
      {error !== "" && <Text style={styles.error}>{error}</Text>}

      {meaningArray.map((items) =>
        items.map((item, index) => (
          <Text key={`__${index}`} style={styles.meaning}>
            {item}
          </Text>
        ))
      )}

      {!!showMore && (
        <View style={styles.btnContainer}>
          {partsOfSpeech.map((item: string, index: number) => (
            <Text key={`__${index}`} style={styles.more}>
              {item}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default Dictionary;

interface IMeaning {
  antonyms: string[];
  definitions: IDefinition[];
  partOfSpeech: string;
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
  title: {
    fontSize: 40,
    color: "pink",
    marginBottom: 10,
  },
  meaning: {
    fontSize: 30,
    margin: 10,
    color: "black",
  },
  error: {
    color: "red",
    marginLeft: 20,
  },
  button: {
    backgroundColor: "pink",
    padding: 5,
    borderRadius: 5,
    fontWeight: "500",
    marginLeft: 10,
  },
  text: {
    fontSize: 25,
    color: "black",
    margin: 10,
  },
  btnContainer: {
    flexDirection: "row",
    gap: 15,
  },
  more: {
    color: "blue",
    fontSize: 30,
    marginTop: 10,
  },
});
