import React, { useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Bell,
  ChevronRight,
  CreditCard,
  Heart,
  HelpCircle,
  LogOut,
  MapPin,
  Package,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react-native";

const ProfileScreen = ({ navigation }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(25)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 45,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  // ==========================================================
  // ROOT NAVIGATION
  // ==========================================================

  const navigateToRootScreen = (screen: string) => {
    const parentNavigation = navigation.getParent();

    if (parentNavigation) {
      parentNavigation.navigate(screen);
    } else {
      navigation.navigate(screen);
    }
  };

  // ==========================================================
  // EDIT PROFILE
  // ==========================================================

  const handleEditProfile = () => {
    navigateToRootScreen("EditProfile");
  };

  // ==========================================================
  // ACCOUNT MENU
  // ==========================================================

  const handleMenuPress = (id: string) => {
    switch (id) {
      case "orders":
        navigateToRootScreen("MyOrders");
        break;

      case "wishlist":
        navigation.navigate("Wishlist");
        break;

      case "addresses":
        navigateToRootScreen("MyAddresses");
        break;

    //   case "payments":
    //     Alert.alert(
    //       "Payment Methods",
    //       "Payment methods screen will be available soon."
    //     );
    //     break;

      default:
        break;
    }
  };

  // ==========================================================
  // SETTINGS
  // ==========================================================

  const handleSettingsPress = (id: string) => {
    switch (id) {
      case "notifications":
        navigateToRootScreen("AccountSettings");
        break;

      case "settings":
        navigateToRootScreen("AccountSettings");
        break;

      case "help":
        navigateToRootScreen("HelpSupport");
        break;

      default:
        break;
    }
  };

  // ==========================================================
  // LOGOUT
  // ==========================================================

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout from your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            console.log("Logout");

            // Later connect real logout:
            // await AsyncStorage.removeItem("token");
            // await AsyncStorage.removeItem("user");
            // navigateToRootScreen("Login");
          },
        },
      ]
    );
  };

  // ==========================================================
  // ACCOUNT MENU
  // ==========================================================

  const menuItems = [
    {
      id: "orders",
      title: "My Orders",
      subtitle: "Track and manage your orders",
      icon: Package,
    },
    {
      id: "wishlist",
      title: "Wishlist",
      subtitle: "Your saved favourites",
      icon: Heart,
    },
    {
      id: "addresses",
      title: "My Addresses",
      subtitle: "Manage your delivery addresses",
      icon: MapPin,
    },
    // {
    //   id: "payments",
    //   title: "Payment Methods",
    //   subtitle: "Manage your payment options",
    //   icon: CreditCard,
    // },
  ];

  // ==========================================================
  // SETTINGS
  // ==========================================================

  const settingsItems = [
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
    },
    {
      id: "settings",
      title: "Account Settings",
      icon: Settings,
    },
    {
      id: "help",
      title: "Help & Support",
      icon: HelpCircle,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#090909" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <View style={styles.header}>
          <Animated.View
            style={[
              styles.headerContent,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View>
              <Text style={styles.headerEyebrow}>MY ACCOUNT</Text>
              <Text style={styles.headerBrand}>I&T</Text>
              <Text style={styles.headerTitle}>PROFILE</Text>
            </View>

            <View style={styles.headerIcon}>
              <UserRound size={20} color="#D6B77A" />
            </View>
          </Animated.View>
        </View>

        {/* =====================================================
            PROFILE CARD
        ===================================================== */}

        <Animated.View
          style={[
            styles.profileCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.avatarWrapper}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=85",
              }}
              style={styles.avatar}
            />

            <View style={styles.onlineDot} />
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.welcomeText}>WELCOME BACK</Text>

            <Text style={styles.profileName}>Nikhil Verma</Text>

            <Text style={styles.profileEmail}>nikhil@example.com</Text>

            <View style={styles.memberBadge}>
              <ShieldCheck size={12} color="#A27A3B" />
              <Text style={styles.memberBadgeText}>I&T MEMBER</Text>
            </View>
          </View>

          {/* ==================================================
              EDIT PROFILE BUTTON
          ================================================== */}

          <Pressable
            style={({ pressed }) => [
              styles.editButton,
              pressed && styles.pressed,
            ]}
            onPress={handleEditProfile}
            android_ripple={{ color: "#EEE8DD" }}
          >
            <Text style={styles.editButtonText}>EDIT</Text>
          </Pressable>
        </Animated.View>

        {/* =====================================================
            QUICK STATS
        ===================================================== */}

        <Animated.View
          style={[
            styles.statsCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Pressable
            style={styles.statItem}
            onPress={() => navigateToRootScreen("MyOrders")}
          >
            <Text style={styles.statNumber}>08</Text>
            <Text style={styles.statLabel}>ORDERS</Text>
          </Pressable>

          <View style={styles.statDivider} />

          <Pressable
            style={styles.statItem}
            onPress={() => navigation.navigate("Wishlist")}
          >
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>WISHLIST</Text>
          </Pressable>

          <View style={styles.statDivider} />

          <Pressable
            style={styles.statItem}
            onPress={() => navigateToRootScreen("MyAddresses")}
          >
            <Text style={styles.statNumber}>02</Text>
            <Text style={styles.statLabel}>ADDRESSES</Text>
          </Pressable>
        </Animated.View>

        {/* =====================================================
            ACCOUNT SECTION
        ===================================================== */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEyebrow}>PERSONAL</Text>
          <Text style={styles.sectionTitle}>My Account</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <Animated.View
                key={item.id}
                style={{
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 25],
                        outputRange: [0, index * 5],
                      }),
                    },
                  ],
                }}
              >
                <Pressable
                  style={({ pressed }) => [
                    styles.menuItem,
                    pressed && styles.menuItemPressed,
                  ]}
                  onPress={() => handleMenuPress(item.id)}
                  android_ripple={{ color: "#EEE8DD" }}
                >
                  <View style={styles.menuIcon}>
                    <Icon size={19} color="#A27A3B" />
                  </View>

                  <View style={styles.menuContent}>
                    <Text style={styles.menuTitle}>{item.title}</Text>

                    <Text style={styles.menuSubtitle}>
                      {item.subtitle}
                    </Text>
                  </View>

                  <ChevronRight size={18} color="#A8A39B" />
                </Pressable>
              </Animated.View>
            );
          })}
        </View>

        {/* =====================================================
            SETTINGS
        ===================================================== */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEyebrow}>PREFERENCES</Text>
          <Text style={styles.sectionTitle}>Settings</Text>
        </View>

        <View style={styles.settingsContainer}>
          {settingsItems.map((item) => {
            const Icon = item.icon;

            return (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  styles.settingItem,
                  pressed && styles.menuItemPressed,
                ]}
                onPress={() => handleSettingsPress(item.id)}
                android_ripple={{ color: "#EEE8DD" }}
              >
                <View style={styles.settingIcon}>
                  <Icon size={18} color="#6F6B64" />
                </View>

                <Text style={styles.settingTitle}>{item.title}</Text>

                <ChevronRight size={17} color="#AAA59D" />
              </Pressable>
            );
          })}
        </View>

        {/* =====================================================
            LOGOUT
        ===================================================== */}

        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.pressed,
          ]}
          onPress={handleLogout}
        >
          <View style={styles.logoutIcon}>
            <LogOut size={18} color="#A34C43" />
          </View>

          <Text style={styles.logoutText}>LOG OUT</Text>

          <ChevronRight size={17} color="#B57C76" />
        </Pressable>

        {/* =====================================================
            SECURITY
        ===================================================== */}

        <View style={styles.securityCard}>
          <ShieldCheck size={19} color="#A27A3B" />

          <View style={styles.securityContent}>
            <Text style={styles.securityTitle}>YOUR PRIVACY MATTERS</Text>

            <Text style={styles.securityText}>
              Your account information is protected with secure encryption.
            </Text>
          </View>
        </View>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <View style={styles.footer}>
          <Text style={styles.footerBrand}>I&T</Text>

          <Text style={styles.footerTitle}>FASHION</Text>

          <Text style={styles.footerText}>
            Timeless style. Modern confidence.
          </Text>

          <Text style={styles.version}>VERSION 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3EF",
  },

  scrollContent: {
    paddingBottom: 35,
  },

  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    backgroundColor: "#090909",
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 29,
  },

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerEyebrow: {
    color: "#999999",
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 3,
  },

  headerBrand: {
    color: "#D6B77A",
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: 3,
    lineHeight: 38,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 4,
  },

  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#393939",
    backgroundColor: "#151515",
    alignItems: "center",
    justifyContent: "center",
  },

  // ==========================================================
  // PROFILE
  // ==========================================================

  profileCard: {
    marginHorizontal: 22,
    marginTop: 20,
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#E6E1D9",
    flexDirection: "row",
    alignItems: "center",
  },

  avatarWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    padding: 2,
    borderWidth: 1,
    borderColor: "#C9A86A",
    position: "relative",
  },

  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 35,
  },

  onlineDot: {
    position: "absolute",
    right: 1,
    bottom: 3,
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "#6F9D63",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  profileInfo: {
    flex: 1,
    marginLeft: 13,
  },

  welcomeText: {
    color: "#A27A3B",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1.5,
  },

  profileName: {
    color: "#171717",
    fontSize: 17,
    fontWeight: "800",
    marginTop: 3,
  },

  profileEmail: {
    color: "#88837B",
    fontSize: 10,
    marginTop: 2,
  },

  memberBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: "#F3EBDD",
  },

  memberBadgeText: {
    color: "#8B6730",
    fontSize: 7,
    fontWeight: "800",
    letterSpacing: 1,
    marginLeft: 4,
  },

  editButton: {
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DCD5C9",
  },

  editButtonText: {
    color: "#8B6B37",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
  },

  // ==========================================================
  // STATS
  // ==========================================================

  statsCard: {
    marginHorizontal: 22,
    marginTop: 13,
    height: 75,
    borderRadius: 18,
    backgroundColor: "#171717",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  statItem: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },

  statNumber: {
    color: "#D6B77A",
    fontSize: 19,
    fontWeight: "800",
  },

  statLabel: {
    color: "#8E8E8E",
    fontSize: 7,
    fontWeight: "700",
    letterSpacing: 1.3,
    marginTop: 3,
  },

  statDivider: {
    height: 31,
    width: 1,
    backgroundColor: "#373737",
  },

  // ==========================================================
  // SECTIONS
  // ==========================================================

  sectionHeader: {
    marginHorizontal: 22,
    marginTop: 28,
    marginBottom: 13,
  },

  sectionEyebrow: {
    color: "#A27A3B",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 2,
  },

  sectionTitle: {
    color: "#171717",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 2,
  },

  // ==========================================================
  // ACCOUNT MENU
  // ==========================================================

  menuContainer: {
    marginHorizontal: 22,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E6E1D9",
    overflow: "hidden",
  },

  menuItem: {
    minHeight: 75,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EFEBE5",
  },

  menuItemPressed: {
    backgroundColor: "#F8F5EF",
  },

  menuIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#F3EBDD",
    alignItems: "center",
    justifyContent: "center",
  },

  menuContent: {
    flex: 1,
    marginLeft: 12,
  },

  menuTitle: {
    color: "#202020",
    fontSize: 12,
    fontWeight: "700",
  },

  menuSubtitle: {
    color: "#99938A",
    fontSize: 9,
    marginTop: 4,
  },

  // ==========================================================
  // SETTINGS
  // ==========================================================

  settingsContainer: {
    marginHorizontal: 22,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E6E1D9",
    overflow: "hidden",
  },

  settingItem: {
    height: 58,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EFEBE5",
  },

  settingIcon: {
    width: 35,
    height: 35,
    borderRadius: 11,
    backgroundColor: "#F4F2ED",
    alignItems: "center",
    justifyContent: "center",
  },

  settingTitle: {
    flex: 1,
    color: "#292929",
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 12,
  },

  // ==========================================================
  // LOGOUT
  // ==========================================================

  logoutButton: {
    marginHorizontal: 22,
    marginTop: 18,
    height: 57,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E4D0CC",
    backgroundColor: "#FFF8F6",
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
  },

  pressed: {
    opacity: 0.75,
  },

  logoutIcon: {
    width: 35,
    height: 35,
    borderRadius: 11,
    backgroundColor: "#F8E9E6",
    alignItems: "center",
    justifyContent: "center",
  },

  logoutText: {
    flex: 1,
    color: "#9D4E46",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.3,
    marginLeft: 11,
  },

  // ==========================================================
  // SECURITY
  // ==========================================================

  securityCard: {
    marginHorizontal: 22,
    marginTop: 18,
    padding: 14,
    borderRadius: 17,
    backgroundColor: "#F0E8D9",
    borderWidth: 1,
    borderColor: "#E3D5BC",
    flexDirection: "row",
    alignItems: "center",
  },

  securityContent: {
    flex: 1,
    marginLeft: 10,
  },

  securityTitle: {
    color: "#765728",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },

  securityText: {
    color: "#8C806E",
    fontSize: 9,
    lineHeight: 14,
    marginTop: 3,
  },

  // ==========================================================
  // FOOTER
  // ==========================================================

  footer: {
    marginHorizontal: 22,
    marginTop: 28,
    paddingTop: 23,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#DDD8CF",
  },

  footerBrand: {
    color: "#A27A3B",
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 3,
  },

  footerTitle: {
    color: "#222222",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 5,
    marginTop: -2,
  },

  footerText: {
    color: "#8A857D",
    fontSize: 10,
    marginTop: 8,
  },

  version: {
    color: "#B1ACA4",
    fontSize: 7,
    letterSpacing: 1,
    marginTop: 12,
  },
});

export default ProfileScreen;


