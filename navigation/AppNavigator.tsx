import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import MovieDetailScreen from "../screens/MovieDetailScreen";
import { COLORS, DIMENSIONS } from "../constants/theme";

export type RootStackParamList = {
  Home: undefined;
  MovieDetail: { movieId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const BackButton: React.FC = () => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}
    >
      <Text style={styles.backButtonText}>← Back</Text>
    </TouchableOpacity>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            headerShown: true,
            header: () => (
              <SafeAreaView style={styles.headerContainer}>
                <View style={styles.headerContent}>
                  <Text style={styles.headerTitle}>MyFlix</Text>
                </View>
              </SafeAreaView>
            ),
          }}
        />
        <Stack.Screen 
          name="MovieDetail" 
          component={MovieDetailScreen}
          options={{ 
            headerShown: true,
            header: () => (
              <SafeAreaView style={styles.headerContainer}>
                <View style={styles.headerContent}>
                  <BackButton />
                  <Text style={styles.headerTitle}>Movie Details</Text>
                </View>
              </SafeAreaView>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.background,
    paddingBottom: DIMENSIONS.spacing.sm,
    borderBottomWidth: 0,
    elevation: 0,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    paddingHorizontal: DIMENSIONS.spacing.md,
  },
  headerTitle: {
    color: COLORS.primary,
    fontSize: DIMENSIONS.fontSize.xxxl,
    fontWeight: DIMENSIONS.fontWeight.bold,
    letterSpacing: -1,
    flex: 1,
    textAlign: "center",
  },
  backButton: {
    paddingHorizontal: DIMENSIONS.spacing.sm,
    paddingVertical: DIMENSIONS.spacing.xs,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: DIMENSIONS.fontSize.lg,
    fontWeight: DIMENSIONS.fontWeight.semibold,
  },
});

export default AppNavigator;
