import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { db } from "./Firebase";
import ViewMap from "./ViewMap";


const Request = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapShown, setMapShown] = useState(false);
  const [locationData, setLocationData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await db
          .collection("RequestService")
          .where("Status", "==", "Pending")
          .get();

        if (!querySnapshot.empty) {

          const data = querySnapshot.docs.map((doc) => doc.data());

          setHistoryData(data);
        } else {

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


  const handleCloseDialog = () => {
    setMapShown(false);
  }
  const ShowMap = (item) => {
    
    console.log("Item",item)
    setLocationData(item) 
    setMapShown(true)
   
    
  }

  return (
    <View style={styles.container} >

      <Text style={styles.title}>Request for services</Text>
      <View style={styles.centeredContainer}>
     
        {loading ? (
          <Text>Loading...</Text>
        ) : historyData.length === 0 ? (
          <Text>No record found</Text>
        ) : (
          <>
            {historyData && historyData.length > 0 && (
              <FlatList
                data={historyData}
                renderItem={({ item }) => (
                  <View style={styles.historyItem}>

                    <Text style={styles.work}>{item.ID_Number}</Text>
                    <Text style={{ color: 'black', textAlign: 'center' }}>{item.email}</Text>
                    <Text style={{ color: 'green', textAlign: 'center' }}>{item.Status}</Text>
                    <TouchableOpacity onPress={()=> ShowMap(item)}>
                      <Text style={{ textAlign: 'center' }} >View</Text>
                    </TouchableOpacity>
                    <ViewMap
          data={locationData}
          visible={mapShown}
          onClose={handleCloseDialog}
        />
                  </View>
                  
                )}
                keyExtractor={(item) => item.id}
                style={styles.historyList}
              />
              
            )}
            
          </>
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

  },
  historyList: {
    flex: 1,
  },
  historyItem: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 5,
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
    textAlign: 'center'
  },
});

export default Request;
