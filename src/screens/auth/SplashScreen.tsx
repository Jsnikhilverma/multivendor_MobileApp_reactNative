
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ArrowRight } from "lucide-react-native";

import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

const { width, height } = Dimensions.get("window");

const SplashScreen = ({ navigation }: Props) => {
  // =========================================================
  // ANIMATIONS
  // =========================================================

  const imageScale = useRef(new Animated.Value(1.12)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;

  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslateY = useRef(new Animated.Value(35)).current;

  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(20)).current;

  const bottomOpacity = useRef(new Animated.Value(0)).current;
  const bottomTranslateY = useRef(new Animated.Value(25)).current;

  const glowScale = useRef(new Animated.Value(0.7)).current;

  // =========================================================
  // START ANIMATION
  // =========================================================

  useEffect(() => {
    Animated.parallel([
      // Background image
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),

      Animated.timing(imageScale, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: true,
      }),

      // Dark overlay
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),

      // Brand
      Animated.sequence([
        Animated.delay(350),

        Animated.parallel([
          Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),

          Animated.spring(logoTranslateY, {
            toValue: 0,
            friction: 7,
            tension: 45,
            useNativeDriver: true,
          }),
        ]),
      ]),

      // Subtitle
      Animated.sequence([
        Animated.delay(750),

        Animated.parallel([
          Animated.timing(subtitleOpacity, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),

          Animated.timing(subtitleTranslateY, {
            toValue: 0,
            duration: 700,
            useNativeDriver: true,
          }),
        ]),
      ]),

      // Bottom section
      Animated.sequence([
        Animated.delay(1100),

        Animated.parallel([
          Animated.timing(bottomOpacity, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),

          Animated.spring(bottomTranslateY, {
            toValue: 0,
            friction: 7,
            tension: 45,
            useNativeDriver: true,
          }),
        ]),
      ]),

      // Ambient glow
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowScale, {
            toValue: 1,
            duration: 1800,
            useNativeDriver: true,
          }),

          Animated.timing(glowScale, {
            toValue: 0.7,
            duration: 1800,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();

    // =======================================================
    // NAVIGATION
    // =======================================================

    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* =====================================================
          BACKGROUND IMAGE
      ====================================================== */}

      <Animated.View
        style={[
          styles.backgroundContainer,
          {
            opacity: imageOpacity,
            transform: [{ scale: imageScale }],
          },
        ]}
      >
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=90",
          }}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </Animated.View>

      {/* =====================================================
          DARK OVERLAY
      ====================================================== */}

      <Animated.View
        style={[
          styles.darkOverlay,
          {
            opacity: overlayOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0.15, 0.68],
            }),
          },
        ]}
      />

      {/* =====================================================
          GOLD AMBIENT LIGHT
      ====================================================== */}

      <Animated.View
        style={[
          styles.topGlow,
          {
            transform: [{ scale: glowScale }],
          },
        ]}
      />

      <View style={styles.bottomGlow} />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <View style={styles.content}>
        {/* ===================================================
            TOP
        ==================================================== */}

        <Animated.View
          style={[
            styles.topSection,
            {
              opacity: logoOpacity,
              transform: [{ translateY: logoTranslateY }],
            },
          ]}
        >
          <View style={styles.smallGoldLine} />

          <Text style={styles.establishedText}>
            EST. 2026
          </Text>
        </Animated.View>

        {/* ===================================================
            CENTER
        ==================================================== */}

        <View style={styles.centerSection}>
          <Animated.View
            style={[
              styles.brandSection,
              {
                opacity: logoOpacity,
                transform: [{ translateY: logoTranslateY }],
              },
            ]}
          >
            <Text style={styles.brandLogo}>
              I&T
            </Text>

            <View style={styles.brandLine} />

            <Text style={styles.brandName}>
              FASHION
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.subtitleSection,
              {
                opacity: subtitleOpacity,
                transform: [{ translateY: subtitleTranslateY }],
              },
            ]}
          >
            <Text style={styles.tagline}>
              ELEVATE YOUR EVERYDAY
            </Text>

            <Text style={styles.description}>
              Discover timeless style,
            </Text>

            <Text style={styles.description}>
              crafted for you.
            </Text>
          </Animated.View>
        </View>

        {/* ===================================================
            BOTTOM
        ==================================================== */}

        <Animated.View
          style={[
            styles.bottomSection,
            {
              opacity: bottomOpacity,
              transform: [{ translateY: bottomTranslateY }],
            },
          ]}
        >
          <View style={styles.separator} />

          <View style={styles.bottomRow}>
            <View style={styles.bottomTextContainer}>
              <Text style={styles.collectionText}>
                PREMIUM COLLECTION
              </Text>

              <Text style={styles.bottomDescription}>
                Fashion that speaks for you
              </Text>
            </View>

            <View style={styles.arrowButton}>
              <ArrowRight
                size={19}
                color="#D6B77A"
                strokeWidth={1.5}
              />
            </View>
          </View>

          <Text style={styles.footerText}>
            YOUR STYLE • YOUR STATEMENT
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default SplashScreen;

// =============================================================
// STYLES
// =============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080808",
  },

  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },

  backgroundImage: {
    width: "100%",
    height: "100%",
  },

  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000",
  },

  topGlow: {
    position: "absolute",
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width,
    top: -width * 0.35,
    right: -width * 0.25,
    backgroundColor: "#C9A86A",
    opacity: 0.08,
  },

  bottomGlow: {
    position: "absolute",
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width,
    bottom: height * 0.18,
    left: -width * 0.3,
    backgroundColor: "#E7C98B",
    opacity: 0.05,
  },

  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 28,
    paddingTop: 80,
    paddingBottom: 40,
  },

  // ===========================================================
  // TOP
  // ===========================================================

  topSection: {
    alignItems: "center",
  },

  smallGoldLine: {
    width: 64,
    height: 1,
    backgroundColor: "#C9A86A",
    marginBottom: 20,
  },

  establishedText: {
    color: "#D6B77A",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 5,
  },

  // ===========================================================
  // CENTER
  // ===========================================================

  centerSection: {
    alignItems: "center",
  },

  brandSection: {
    alignItems: "center",
  },

  brandLogo: {
    color: "#FFFFFF",
    fontSize: 45,
    fontWeight: "700",
    letterSpacing: 7,
  },

  brandLine: {
    width: 112,
    height: 1,
    backgroundColor: "#C9A86A",
    marginTop: 12,
  },

  brandName: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 8,
    marginTop: 16,
  },

  subtitleSection: {
    alignItems: "center",
    marginTop: 28,
  },

  tagline: {
    color: "#E4E4E4",
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 3,
    textAlign: "center",
  },

  description: {
    color: "#BDBDBD",
    fontSize: 12,
    lineHeight: 20,
    textAlign: "center",
  },

  // ===========================================================
  // BOTTOM
  // ===========================================================

  bottomSection: {
    alignItems: "center",
  },

  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(255,255,255,0.20)",
    marginBottom: 20,
  },

  bottomRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  bottomTextContainer: {
    flex: 1,
  },

  collectionText: {
    color: "#9F9F9F",
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: 2,
  },

  bottomDescription: {
    color: "#D5D5D5",
    fontSize: 12,
    marginTop: 5,
  },

  arrowButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#C9A86A",
    backgroundColor: "rgba(0,0,0,0.30)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
  },

  footerText: {
    color: "#777777",
    fontSize: 9,
    letterSpacing: 3,
    marginTop: 28,
  },
});
