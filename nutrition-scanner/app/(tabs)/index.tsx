import { StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Link, router } from 'expo-router';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabOneScreen() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nutrition Scanner</Text>
        <Text style={styles.subtitle}>Eat safe, stay healthy.</Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
          onPress={() => router.push('/(tabs)/scan')}
        >
          <FontAwesome name="camera" size={40} color="#fff" />
          <Text style={styles.cardTitle}>Scan Label</Text>
          <Text style={styles.cardDesc}>Check ingredients instantly</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}
          onPress={() => router.push('/(tabs)/settings')}
        >
          <FontAwesome name="list" size={40} color={Colors[colorScheme ?? 'light'].text} />
          <Text style={styles.cardTitle}>Avoid List</Text>
          <Text style={styles.cardDesc}>Manage your restrictions</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>How it works</Text>
        <View style={styles.step}>
          <FontAwesome name="list-ul" size={20} style={styles.stepIcon} color={Colors[colorScheme ?? 'light'].text} />
          <Text style={styles.stepText}>1. Add ingredients you want to avoid.</Text>
        </View>
        <View style={styles.step}>
          <FontAwesome name="camera" size={20} style={styles.stepIcon} color={Colors[colorScheme ?? 'light'].text} />
          <Text style={styles.stepText}>2. Scan a food label.</Text>
        </View>
        <View style={styles.step}>
          <FontAwesome name="warning" size={20} style={styles.stepIcon} color={Colors[colorScheme ?? 'light'].text} />
          <Text style={styles.stepText}>3. Get instant warnings for hidden dangers.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.7,
    marginTop: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  card: {
    width: '48%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: 'inherit',
  },
  cardDesc: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.8,
  },
  infoSection: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepIcon: {
    width: 30,
    textAlign: 'center',
    marginRight: 10,
  },
  stepText: {
    fontSize: 16,
  },
});
