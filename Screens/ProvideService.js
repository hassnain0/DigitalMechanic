import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { db, } from "./Firebase";

const ProvideService= () => {
  const [loading, setLoading] = useState(true);
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const querySnapshot = await db
          .collection("Registration").where("Identity",'==',"Mechanic")
          .get()
         
        if (!querySnapshot.empty) {
          const specialtiesData = querySnapshot.docs.map((doc) => doc.data().ShopDetails);
          setSpecialties(specialtiesData);
        } else {
          setSpecialties([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData(); // Fetch data when the component mounts

    return () => {
      // Clean up any listeners or subscriptions if needed
    };
  }, []);

  const SpecialtyItem = ({ specialty, index }) => (
    <View style={styles.specialtyItem}>
      <Text style={styles.specialtyText}>{`${index + 1}. ${specialty}`}</Text>
      {/* Add more information about the specialty if needed */}
    </View>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={specialties}
      renderItem={({ item, index }) => <SpecialtyItem specialty={item} index={index} />}
      keyExtractor={(item) => item} // Using the specialty itself as the key, assuming it is unique
    />
  );
};

const styles = StyleSheet.create({
  specialtyItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  specialtyText: {
    fontSize: 18,
  },
});

export default ProvideService;
