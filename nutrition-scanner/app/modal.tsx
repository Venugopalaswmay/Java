import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Warning } from '@/types';

export default function ModalScreen() {
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const warnings: Warning[] = params.warnings ? JSON.parse(params.warnings as string) : [];
  const scannedText = params.scannedText as string;

  const isSafe = warnings.length === 0;
  const statusColor = isSafe ? Colors[colorScheme ?? 'light'].safe : Colors[colorScheme ?? 'light'].warning;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: statusColor }]}>
        <FontAwesome name={isSafe ? "check-circle" : "exclamation-triangle"} size={60} color="#fff" />
        <Text style={styles.headerText}>
          {isSafe ? "Safe to Eat" : "Warning Detected"}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {isSafe ? (
          <View style={styles.safeContainer}>
            <Text style={styles.safeText}>
              No ingredients from your avoid list were found.
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.sectionTitle}>Found Ingredients:</Text>
            {warnings.map((w, index) => (
              <View key={index} style={[styles.warningCard, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
                <View style={styles.warningHeader}>
                  <FontAwesome name="warning" size={16} color={Colors[colorScheme ?? 'light'].warning} />
                  <Text style={styles.warningTitle}>{w.ingredient}</Text>
                </View>
                <Text style={styles.warningMessage}>{w.message}</Text>
                {w.matchedAlias !== w.ingredient && (
                  <Text style={styles.aliasText}>Matched alias: "{w.matchedAlias}"</Text>
                )}
              </View>
            ))}
          </View>
        )}

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <Text style={styles.sectionTitle}>Scanned Text:</Text>
        <Text style={styles.scannedText}>{scannedText}</Text>
      </ScrollView>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  safeContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  safeText: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  warningCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  warningMessage: {
    fontSize: 14,
    marginBottom: 5,
  },
  aliasText: {
    fontSize: 12,
    fontStyle: 'italic',
    opacity: 0.6,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '100%',
  },
  scannedText: {
    fontSize: 12,
    fontFamily: 'Courier',
    opacity: 0.7,
    marginBottom: 40,
  },
});
