
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react-native";

import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // =========================================================
  // ANIMATIONS
  // =========================================================

  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(40)).current;

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;

  const formOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(25)).current;

  const footerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),

        Animated.spring(logoScale, {
          toValue: 1,
          friction: 7,
          tension: 45,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),

        Animated.timing(contentTranslateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(formOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),

        Animated.timing(formTranslateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),

      Animated.timing(footerOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // =========================================================
  // LOGIN
  // =========================================================

  const handleLogin = () => {
    // API login yahan connect karenge.
    navigation.replace("Main");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=90",
        }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.imageOverlay} />

        {/* Decorative gold glow */}
        <View style={styles.topGlow} />
        <View style={styles.bottomGlow} />

        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* =================================================
                HEADER
            ================================================== */}

            <Animated.View
              style={[
                styles.header,
                {
                  opacity: logoOpacity,
                  transform: [{ scale: logoScale }],
                },
              ]}
            >
              <Text style={styles.established}>EST. 2026</Text>

              <View style={styles.headerLine} />

              <Text style={styles.logo}>I&T</Text>

              <Text style={styles.brandName}>FASHION</Text>
            </Animated.View>

            {/* =================================================
                CONTENT
            ================================================== */}

            <Animated.View
              style={[
                styles.content,
                {
                  opacity: contentOpacity,
                  transform: [{ translateY: contentTranslateY }],
                },
              ]}
            >
              <Text style={styles.title}>Welcome Back</Text>

              <Text style={styles.subtitle}>
                Sign in to continue your{"\n"}luxury shopping experience.
              </Text>
            </Animated.View>

            {/* =================================================
                LOGIN CARD
            ================================================== */}

            <Animated.View
              style={[
                styles.card,
                {
                  opacity: formOpacity,
                  transform: [{ translateY: formTranslateY }],
                },
              ]}
            >
              {/* Email */}

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>EMAIL ADDRESS</Text>

                <View style={styles.inputWrapper}>
                  <Mail
                    size={18}
                    color="#C9A86A"
                    strokeWidth={1.5}
                  />

                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    placeholderTextColor="#777777"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                  />
                </View>
              </View>

              {/* Password */}

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>PASSWORD</Text>

                <View style={styles.inputWrapper}>
                  <Lock
                    size={18}
                    color="#C9A86A"
                    strokeWidth={1.5}
                  />

                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#777777"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    style={styles.input}
                  />

                  <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    hitSlop={10}
                    style={styles.eyeButton}
                  >
                    {showPassword ? (
                      <EyeOff
                        size={19}
                        color="#999999"
                        strokeWidth={1.5}
                      />
                    ) : (
                      <Eye
                        size={19}
                        color="#999999"
                        strokeWidth={1.5}
                      />
                    )}
                  </Pressable>
                </View>
              </View>

              {/* Forgot Password */}

              <Pressable
                style={styles.forgotButton}
                onPress={() => {}}
              >
                <Text style={styles.forgotText}>
                  Forgot Password?
                </Text>
              </Pressable>

              {/* Login Button */}

              <Pressable
                style={({ pressed }) => [
                  styles.loginButton,
                  pressed && styles.loginButtonPressed,
                ]}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>
                  SIGN IN
                </Text>

                <View style={styles.buttonArrow}>
                  <ArrowRight
                    size={17}
                    color="#111111"
                    strokeWidth={2}
                  />
                </View>
              </Pressable>

              {/* Security */}

              <View style={styles.securityRow}>
                <ShieldCheck
                  size={16}
                  color="#C9A86A"
                  strokeWidth={1.5}
                />

                <Text style={styles.securityText}>
                  Your information is securely protected
                </Text>
              </View>
            </Animated.View>

            {/* =================================================
                REGISTER
            ================================================== */}

            <Animated.View
              style={[
                styles.registerSection,
                {
                  opacity: footerOpacity,
                },
              ]}
            >
              <Text style={styles.registerText}>
                Don't have an account?
              </Text>

              <Pressable
                onPress={() => navigation.navigate("Register")}
                hitSlop={8}
              >
                <Text style={styles.registerButton}>
                  CREATE ACCOUNT
                </Text>
              </Pressable>
            </Animated.View>

            {/* Bottom brand */}

            <Animated.View
              style={[
                styles.bottomBrand,
                {
                  opacity: footerOpacity,
                },
              ]}
            >
              <View style={styles.bottomLine} />

              <Text style={styles.bottomBrandText}>
                YOUR STYLE • YOUR STATEMENT
              </Text>

              <View style={styles.bottomLine} />
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

// =============================================================
// STYLES
// =============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080808",
  },

  background: {
    flex: 1,
  },

  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.76)",
  },

  topGlow: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    top: -150,
    right: -100,
    backgroundColor: "#C9A86A",
    opacity: 0.08,
  },

  bottomGlow: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    bottom: -130,
    left: -100,
    backgroundColor: "#C9A86A",
    opacity: 0.06,
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 55,
    paddingBottom: 30,
  },

  // ===========================================================
  // HEADER
  // ===========================================================

  header: {
    alignItems: "center",
    marginBottom: 38,
  },

  established: {
    color: "#C9A86A",
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 4,
    marginBottom: 12,
  },

  headerLine: {
    width: 45,
    height: 1,
    backgroundColor: "#C9A86A",
    marginBottom: 14,
  },

  logo: {
    color: "#FFFFFF",
    fontSize: 35,
    fontWeight: "700",
    letterSpacing: 6,
  },

  brandName: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 5,
    marginTop: 4,
  },

  // ===========================================================
  // CONTENT
  // ===========================================================

  content: {
    marginBottom: 24,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 31,
    fontWeight: "600",
    letterSpacing: 0.3,
    marginBottom: 8,
  },

  subtitle: {
    color: "#B9B9B9",
    fontSize: 13,
    lineHeight: 20,
  },

  // ===========================================================
  // CARD
  // ===========================================================

  card: {
    backgroundColor: "rgba(15,15,15,0.91)",
    borderWidth: 1,
    borderColor: "rgba(201,168,106,0.22)",
    borderRadius: 24,
    padding: 22,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },

  // ===========================================================
  // FIELDS
  // ===========================================================

  fieldContainer: {
    marginBottom: 19,
  },

  fieldLabel: {
    color: "#8E8E8E",
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 2,
    marginBottom: 9,
  },

  inputWrapper: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 14,
    paddingHorizontal: 15,
    backgroundColor: "rgba(255,255,255,0.035)",
  },

  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    marginLeft: 12,
    paddingVertical: 0,
  },

  eyeButton: {
    paddingLeft: 10,
  },

  // ===========================================================
  // FORGOT
  // ===========================================================

  forgotButton: {
    alignSelf: "flex-end",
    marginTop: -5,
    marginBottom: 20,
  },

  forgotText: {
    color: "#C9A86A",
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 0.3,
  },

  // ===========================================================
  // LOGIN BUTTON
  // ===========================================================

  loginButton: {
    height: 56,
    borderRadius: 14,
    backgroundColor: "#D6B77A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  loginButtonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },

  loginButtonText: {
    color: "#111111",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 3,
  },

  buttonArrow: {
    position: "absolute",
    right: 15,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },

  // ===========================================================
  // SECURITY
  // ===========================================================

  securityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  securityText: {
    color: "#777777",
    fontSize: 10,
    marginLeft: 7,
  },

  // ===========================================================
  // REGISTER
  // ===========================================================

  registerSection: {
    alignItems: "center",
    marginTop: 27,
  },

  registerText: {
    color: "#888888",
    fontSize: 12,
    marginBottom: 8,
  },

  registerButton: {
    color: "#D6B77A",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 2,
  },

  // ===========================================================
  // BOTTOM
  // ===========================================================

  bottomBrand: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  bottomLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
  },

  bottomBrandText: {
    color: "#666666",
    fontSize: 7,
    letterSpacing: 2,
    marginHorizontal: 10,
  },
});
