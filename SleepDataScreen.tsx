import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit';

interface SleepSession {
  startDate: string;
  endDate: string;
  sleepStages?: string; // Optional, just in case
}

const SleepDataScreen = () => {
  const [sleepData, setSleepData] = useState<SleepSession[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Request authorization with Google Fit scopes
    GoogleFit.checkIsAuthorized().then(() => {
      if (!GoogleFit.isAuthorized) {
        GoogleFit.authorize({
          scopes: [
            Scopes.FITNESS_ACTIVITY_READ,
            Scopes.FITNESS_SLEEP_READ,
          ],
        }).then(authResult => {
          if (authResult.success) {
            fetchSleepData();
          } else {
            setError('Authorization failed');
            setLoading(false);
          }
        });
      } else {
        fetchSleepData();
      }
    });
  }, []);

 const fetchSleepData = () => {
  const options = {
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(), // 7 days ago
    endDate: new Date().toISOString(),
  };

  GoogleFit.getSleepSamples(options, true)  // <--- added 'true' here
    .then(res => {
      setSleepData(res);
      setLoading(false);
    })
    .catch(err => {
      setError('Failed to fetch sleep data');
      setLoading(false);
    });
};

  const renderItem = ({ item }: { item: SleepSession }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.dateText}>
        Sleep from {new Date(item.startDate).toLocaleString()} to {new Date(item.endDate).toLocaleString()}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sleep Data (Last 7 Days)</Text>
      <FlatList
        data={sleepData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.noData}>No sleep data available</Text>}
      />
    </View>
  );
};

export default SleepDataScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  itemContainer: { paddingVertical: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 },
  dateText: { fontSize: 16 },
  noData: { textAlign: 'center', marginTop: 30, color: '#888' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', fontSize: 18 },
});
