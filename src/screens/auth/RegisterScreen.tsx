
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
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
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react-native";

import { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen = ({ navigation }: Props) => {
  // =========================================================
  // FORM STATE
  // =========================================================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // =========================================================
  // ANIMATIONS
  // =========================================================

  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerScale = useRef(new Animated.Value(0.85)).current;

  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(35)).current;

  const formOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(25)).current;

  const footerOpacity = useRef(new Animated.Value(0)).current;

  // =========================================================
  // START ANIMATION
  // =========================================================

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),

        Animated.spring(headerScale, {
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
  // EMAIL VALIDATION
  // =========================================================

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  // =========================================================
  // FORM VALIDATION
  // =========================================================

  const validateForm = () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    if (!cleanName) {
      Alert.alert(
        "Name Required",
        "Please enter your full name."
      );
      return false;
    }

    if (cleanName.length < 2) {
      Alert.alert(
        "Invalid Name",
        "Please enter a valid full name."
      );
      return false;
    }

    if (!cleanEmail) {
      Alert.alert(
        "Email Required",
        "Please enter your email address."
      );
      return false;
    }

    if (!isValidEmail(cleanEmail)) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address."
      );
      return false;
    }

    if (!cleanPhone) {
      Alert.alert(
        "Phone Required",
        "Please enter your phone number."
      );
      return false;
    }

    if (cleanPhone.length !== 10) {
      Alert.alert(
        "Invalid Phone",
        "Please enter a valid 10-digit phone number."
      );
      return false;
    }

    if (!password) {
      Alert.alert(
        "Password Required",
        "Please create a password."
      );
      return false;
    }

    if (password.length < 6) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 6 characters."
      );
      return false;
    }

    if (!confirmPassword) {
      Alert.alert(
        "Confirm Password",
        "Please confirm your password."
      );
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Password Mismatch",
        "Password and confirm password must match."
      );
      return false;
    }

    return true;
  };

  // =========================================================
  // SUBMIT / REGISTER
  // =========================================================

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    const valid = validateForm();

    if (!valid) {
      return;
    }

    try {
      setIsSubmitting(true);

      /*
       * =====================================================
       * TEMPORARY REGISTER FLOW
       * =====================================================
       *
       * Yahan baad me backend API connect karenge:
       *
       * POST /auth/register
       *
       * Example payload:
       *
       * {
       *   name,
       *   email,
       *   phone,
       *   password
       * }
       *
       * Abhi testing ke liye Main par ja raha hai.
       */

      await new Promise(resolve =>
        setTimeout(resolve, 700)
      );

      navigation.replace("Main");
    } catch (error) {
      Alert.alert(
        "Registration Failed",
        "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

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
          uri:
            "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1200&q=90",
        }}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Dark cinematic overlay */}

        <View style={styles.imageOverlay} />

        {/* Gold ambient lights */}

        <View style={styles.topGlow} />

        <View style={styles.bottomGlow} />

        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : undefined
          }
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* =================================================
                BRAND HEADER
            ================================================== */}

            <Animated.View
              style={[
                styles.header,
                {
                  opacity: headerOpacity,
                  transform: [
                    {
                      scale: headerScale,
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.established}>
                EST. 2026
              </Text>

              <View style={styles.headerLine} />

              <Text style={styles.logo}>I&T</Text>

              <Text style={styles.brandName}>
                FASHION
              </Text>
            </Animated.View>

            {/* =================================================
                PAGE TITLE
            ================================================== */}

            <Animated.View
              style={[
                styles.content,
                {
                  opacity: contentOpacity,
                  transform: [
                    {
                      translateY: contentTranslateY,
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.title}>
                Create Your Account
              </Text>

              <Text style={styles.subtitle}>
                Join our community and discover{"\n"}
                your personal style.
              </Text>
            </Animated.View>

            {/* =================================================
                REGISTER FORM
            ================================================== */}

            <Animated.View
              style={[
                styles.card,
                {
                  opacity: formOpacity,
                  transform: [
                    {
                      translateY: formTranslateY,
                    },
                  ],
                },
              ]}
            >
              {/* =================================================
                  NAME
              ================================================== */}

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>
                  FULL NAME
                </Text>

                <View style={styles.inputWrapper}>
                  <User
                    size={18}
                    color="#C9A86A"
                    strokeWidth={1.5}
                  />

                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your full name"
                    placeholderTextColor="#777777"
                    style={styles.input}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* =================================================
                  EMAIL
              ================================================== */}

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>
                  EMAIL ADDRESS
                </Text>

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

              {/* =================================================
                  PHONE
              ================================================== */}

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>
                  PHONE NUMBER
                </Text>

                <View style={styles.inputWrapper}>
                  <Phone
                    size={18}
                    color="#C9A86A"
                    strokeWidth={1.5}
                  />

                  <TextInput
                    value={phone}
                    onChangeText={value =>
                      setPhone(
                        value.replace(/[^0-9]/g, "")
                      )
                    }
                    placeholder="Enter your phone number"
                    placeholderTextColor="#777777"
                    keyboardType="phone-pad"
                    maxLength={10}
                    style={styles.input}
                  />
                </View>
              </View>

              {/* =================================================
                  PASSWORD
              ================================================== */}

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>
                  PASSWORD
                </Text>

                <View style={styles.inputWrapper}>
                  <Lock
                    size={18}
                    color="#C9A86A"
                    strokeWidth={1.5}
                  />

                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Create a password"
                    placeholderTextColor="#777777"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                  />

                  <Pressable
                    onPress={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
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

              {/* =================================================
                  CONFIRM PASSWORD
              ================================================== */}

              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>
                  CONFIRM PASSWORD
                </Text>

                <View style={styles.inputWrapper}>
                  <Lock
                    size={18}
                    color="#C9A86A"
                    strokeWidth={1.5}
                  />

                  <TextInput
                    value={confirmPassword}
                    onChangeText={
                      setConfirmPassword
                    }
                    placeholder="Confirm your password"
                    placeholderTextColor="#777777"
                    secureTextEntry={
                      !showConfirmPassword
                    }
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                  />

                  <Pressable
                    onPress={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    hitSlop={10}
                    style={styles.eyeButton}
                  >
                    {showConfirmPassword ? (
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

              {/* =================================================
                  TERMS
              ================================================== */}

              <View style={styles.termsRow}>
                <View style={styles.checkBox}>
                  <Check
                    size={12}
                    color="#111111"
                    strokeWidth={2.5}
                  />
                </View>

                <Text style={styles.termsText}>
                  By creating an account, you agree to
                  our{" "}
                  <Text style={styles.termsHighlight}>
                    Terms & Privacy Policy
                  </Text>
                </Text>
              </View>

              {/* =================================================
                  SUBMIT BUTTON
              ================================================== */}

              <Pressable
                onPress={handleSubmit}
                disabled={isSubmitting}
                style={({ pressed }) => [
                  styles.submitButton,

                  pressed &&
                    !isSubmitting &&
                    styles.submitButtonPressed,

                  isSubmitting &&
                    styles.submitButtonDisabled,
                ]}
              >
                <Text style={styles.submitButtonText}>
                  {isSubmitting
                    ? "CREATING ACCOUNT..."
                    : "SUBMIT"}
                </Text>

                {!isSubmitting && (
                  <View style={styles.buttonArrow}>
                    <ArrowRight
                      size={17}
                      color="#111111"
                      strokeWidth={2}
                    />
                  </View>
                )}
              </Pressable>

              {/* =================================================
                  SECURITY MESSAGE
              ================================================== */}

              <View style={styles.securityRow}>
                <Lock
                  size={14}
                  color="#C9A86A"
                  strokeWidth={1.5}
                />

                <Text style={styles.securityText}>
                  Your information is securely protected
                </Text>
              </View>
            </Animated.View>

            {/* =================================================
                LOGIN
            ================================================== */}

            <Animated.View
              style={[
                styles.loginSection,
                {
                  opacity: footerOpacity,
                },
              ]}
            >
              <Text style={styles.loginText}>
                Already have an account?
              </Text>

              <Pressable
                onPress={() => navigation.goBack()}
                hitSlop={8}
              >
                <Text style={styles.loginButton}>
                  SIGN IN
                </Text>
              </Pressable>
            </Animated.View>

            {/* =================================================
                FOOTER
            ================================================== */}

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

export default RegisterScreen;

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
    backgroundColor: "rgba(0,0,0,0.78)",
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
    paddingTop: 50,
    paddingBottom: 30,
  },

  // ===========================================================
  // HEADER
  // ===========================================================

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  established: {
    color: "#C9A86A",
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 4,
    marginBottom: 11,
  },

  headerLine: {
    width: 45,
    height: 1,
    backgroundColor: "#C9A86A",
    marginBottom: 13,
  },

  logo: {
    color: "#FFFFFF",
    fontSize: 34,
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
    marginBottom: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "600",
    letterSpacing: 0.2,
    marginBottom: 7,
  },

  subtitle: {
    color: "#B9B9B9",
    fontSize: 13,
    lineHeight: 20,
  },

  // ===========================================================
  // FORM CARD
  // ===========================================================

  card: {
    backgroundColor: "rgba(15,15,15,0.93)",
    borderWidth: 1,
    borderColor: "rgba(201,168,106,0.22)",
    borderRadius: 24,
    padding: 21,

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
  // INPUTS
  // ===========================================================

  fieldContainer: {
    marginBottom: 15,
  },

  fieldLabel: {
    color: "#8E8E8E",
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 2,
    marginBottom: 8,
  },

  inputWrapper: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 13,
    paddingHorizontal: 14,
    backgroundColor: "rgba(255,255,255,0.035)",
  },

  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    marginLeft: 11,
    paddingVertical: 0,
  },

  eyeButton: {
    paddingLeft: 10,
  },

  // ===========================================================
  // TERMS
  // ===========================================================

  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 2,
    marginBottom: 20,
  },

  checkBox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    backgroundColor: "#D6B77A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
    marginTop: 1,
  },

  termsText: {
    flex: 1,
    color: "#777777",
    fontSize: 10,
    lineHeight: 16,
  },

  termsHighlight: {
    color: "#C9A86A",
    fontWeight: "500",
  },

  // ===========================================================
  // SUBMIT BUTTON
  // ===========================================================

  submitButton: {
    height: 56,
    borderRadius: 14,
    backgroundColor: "#D6B77A",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    position: "relative",

    shadowColor: "#C9A86A",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,

    elevation: 5,
  },

  submitButtonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },

  submitButtonDisabled: {
    opacity: 0.6,
  },

  submitButtonText: {
    color: "#111111",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 3,
  },

  buttonArrow: {
    position: "absolute",
    right: 14,

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
    marginTop: 17,
  },

  securityText: {
    color: "#777777",
    fontSize: 10,
    marginLeft: 7,
  },

  // ===========================================================
  // LOGIN
  // ===========================================================

  loginSection: {
    alignItems: "center",
    marginTop: 25,
  },

  loginText: {
    color: "#888888",
    fontSize: 12,
    marginBottom: 8,
  },

  loginButton: {
    color: "#D6B77A",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 2,
  },

  // ===========================================================
  // FOOTER
  // ===========================================================

  bottomBrand: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 27,
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
