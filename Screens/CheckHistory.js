import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { db } from "./Firebase";


const CheckHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await db
          .collection("RequestService")
          .where("Status", "==", "Done")
          .get();

        if (!querySnapshot.empty) {
          // If at least one matching document is found
          const data = querySnapshot.docs.map((doc) => doc.data());
          setHistoryData(data);
        } else {
          // If no matching documents are found
          setHistoryData([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Render each item in the history list
  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.work}>{item.work}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History of Work Done</Text>
      <View style={styles.centeredContainer}>
        {loading ? (
          <Text>Loading...</Text>
        ) : historyData.length === 0 ? (
          <Text>No record found</Text>
        ) : (
          <FlatList
            data={historyData}
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item.id}
            style={styles.historyList}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  historyList: {
    flex: 1,
  },
  historyItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#666",
  },
  work: {
    fontSize: 16,
    color: "#333",
  },
});

export default CheckHistory;
