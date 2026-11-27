
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
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
import {
  ArrowLeft,
  Camera,
  Check,
  Mail,
  Phone,
  Save,
  UserRound,
} from "lucide-react-native";

const EditProfileScreen = ({ navigation }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(25)).current;

  const [name, setName] = useState("Nikhil Verma");
  const [email, setEmail] = useState("nikhil@example.com");
  const [phone, setPhone] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
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
  // SAVE PROFILE
  // ==========================================================

  const handleSave = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      Alert.alert("Missing Name", "Please enter your full name.");
      return;
    }

    if (!trimmedEmail) {
      Alert.alert("Missing Email", "Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (trimmedPhone && !/^[0-9]{10}$/.test(trimmedPhone)) {
      Alert.alert(
        "Invalid Phone",
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    setSaving(true);

    // ----------------------------------------------------------
    // Demo save
    // Backend API can be connected here later.
    // ----------------------------------------------------------

    setTimeout(() => {
      setSaving(false);

      Alert.alert(
        "Profile Updated",
        "Your profile information has been updated successfully.",
        [
          {
            text: "Done",
            onPress: () => {
              navigation.goBack();
            },
          },
        ]
      );
    }, 700);
  };

  // ==========================================================
  // CHANGE PHOTO
  // ==========================================================

  const handleChangePhoto = () => {
    Alert.alert(
      "Profile Photo",
      "Profile photo upload will be connected soon."
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#090909" />

      {/* ======================================================
          HEADER
      ====================================================== */}

      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
          onPress={() => navigation.goBack()}
          hitSlop={10}
        >
          <ArrowLeft size={21} color="#FFFFFF" />
        </Pressable>

        <View style={styles.headerCenter}>
          <Text style={styles.headerEyebrow}>MY ACCOUNT</Text>
          <Text style={styles.headerTitle}>EDIT PROFILE</Text>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          {/* ==================================================
              INTRO
          ================================================== */}

          <Animated.View
            style={[
              styles.intro,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.introEyebrow}>PERSONAL INFORMATION</Text>

            <Text style={styles.introTitle}>Your Profile</Text>

            <Text style={styles.introText}>
              Keep your personal information up to date for a better shopping
              experience.
            </Text>
          </Animated.View>

          {/* ==================================================
              PROFILE PHOTO
          ================================================== */}

          <Animated.View
            style={[
              styles.photoSection,
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

              <Pressable
                style={({ pressed }) => [
                  styles.cameraButton,
                  pressed && styles.pressed,
                ]}
                onPress={handleChangePhoto}
              >
                <Camera size={15} color="#FFFFFF" />
              </Pressable>
            </View>

            <View style={styles.photoInfo}>
              <Text style={styles.photoTitle}>PROFILE PHOTO</Text>

              <Text style={styles.photoText}>
                Add a photo to personalize your account.
              </Text>

              <Pressable onPress={handleChangePhoto}>
                <Text style={styles.changePhoto}>CHANGE PHOTO</Text>
              </Pressable>
            </View>
          </Animated.View>

          {/* ==================================================
              FORM
          ================================================== */}

          <Animated.View
            style={[
              styles.formCard,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* NAME */}

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>FULL NAME</Text>

              <View style={styles.inputWrapper}>
                <View style={styles.inputIcon}>
                  <UserRound size={17} color="#A27A3B" />
                </View>

                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your full name"
                  placeholderTextColor="#AAA49A"
                  style={styles.input}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
              </View>
            </View>

            {/* EMAIL */}

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>

              <View style={styles.inputWrapper}>
                <View style={styles.inputIcon}>
                  <Mail size={17} color="#A27A3B" />
                </View>

                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#AAA49A"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                />
              </View>
            </View>

            {/* PHONE */}

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>PHONE NUMBER</Text>

              <View style={styles.inputWrapper}>
                <View style={styles.inputIcon}>
                  <Phone size={17} color="#A27A3B" />
                </View>

                <TextInput
                  value={phone}
                  onChangeText={(value) =>
                    setPhone(value.replace(/[^0-9]/g, "").slice(0, 10))
                  }
                  placeholder="Enter your phone number"
                  placeholderTextColor="#AAA49A"
                  style={styles.input}
                  keyboardType="phone-pad"
                  maxLength={10}
                  returnKeyType="done"
                />
              </View>
            </View>
          </Animated.View>

          {/* ==================================================
              ACCOUNT INFO
          ================================================== */}

          <Animated.View
            style={[
              styles.infoCard,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <View style={styles.infoIcon}>
              <Check size={16} color="#A27A3B" />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>ACCOUNT INFORMATION</Text>

              <Text style={styles.infoText}>
                Your email address may be used for order updates, account
                notifications and important security information.
              </Text>
            </View>
          </Animated.View>

          {/* ==================================================
              SAVE BUTTON
          ================================================== */}

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <Pressable
              style={({ pressed }) => [
                styles.saveButton,
                saving && styles.saveButtonDisabled,
                pressed && !saving && styles.pressed,
              ]}
              onPress={handleSave}
              disabled={saving}
            >
              {saving ? (
                <Text style={styles.saveButtonText}>SAVING...</Text>
              ) : (
                <>
                  <Save size={18} color="#090909" />
                  <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
                </>
              )}
            </Pressable>
          </Animated.View>

          {/* ==================================================
              CANCEL
          ================================================== */}

          <Pressable
            style={({ pressed }) => [
              styles.cancelButton,
              pressed && styles.pressed,
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelText}>CANCEL</Text>
          </Pressable>

          {/* ==================================================
              FOOTER
          ================================================== */}

          <View style={styles.footer}>
            <Text style={styles.footerBrand}>I&T</Text>

            <Text style={styles.footerTitle}>FASHION</Text>

            <Text style={styles.footerText}>
              Timeless style. Modern confidence.
            </Text>

            <Text style={styles.version}>VERSION 1.0.0</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3EF",
  },

  keyboardContainer: {
    flex: 1,
  },

  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    height: 86,
    backgroundColor: "#090909",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 43,
    height: 43,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#383838",
    backgroundColor: "#151515",
    alignItems: "center",
    justifyContent: "center",
  },

  headerCenter: {
    alignItems: "center",
  },

  headerEyebrow: {
    color: "#999999",
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 2.5,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 2.5,
    marginTop: 4,
  },

  headerSpacer: {
    width: 43,
  },

  // ==========================================================
  // INTRO
  // ==========================================================

  intro: {
    marginHorizontal: 22,
    marginTop: 27,
  },

  introEyebrow: {
    color: "#A27A3B",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 2,
  },

  introTitle: {
    color: "#171717",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 3,
  },

  introText: {
    color: "#88837B",
    fontSize: 10,
    lineHeight: 16,
    marginTop: 7,
    maxWidth: 340,
  },

  // ==========================================================
  // PHOTO
  // ==========================================================

  photoSection: {
    marginHorizontal: 22,
    marginTop: 24,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6E1D9",
    flexDirection: "row",
    alignItems: "center",
  },

  avatarWrapper: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 1,
    borderColor: "#C9A86A",
    padding: 3,
    position: "relative",
  },

  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 39,
  },

  cameraButton: {
    position: "absolute",
    right: -3,
    bottom: -1,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#171717",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  photoInfo: {
    flex: 1,
    marginLeft: 15,
  },

  photoTitle: {
    color: "#282828",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  photoText: {
    color: "#99938A",
    fontSize: 9,
    lineHeight: 14,
    marginTop: 5,
  },

  changePhoto: {
    color: "#A27A3B",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: 8,
  },

  // ==========================================================
  // FORM
  // ==========================================================

  formCard: {
    marginHorizontal: 22,
    marginTop: 16,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6E1D9",
  },

  inputGroup: {
    marginBottom: 17,
  },

  inputLabel: {
    color: "#6E675D",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1.4,
    marginBottom: 7,
  },

  inputWrapper: {
    height: 53,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2DDD5",
    backgroundColor: "#FBFAF8",
    flexDirection: "row",
    alignItems: "center",
  },

  inputIcon: {
    width: 43,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    flex: 1,
    height: "100%",
    color: "#242424",
    fontSize: 12,
    paddingRight: 13,
  },

  // ==========================================================
  // INFO CARD
  // ==========================================================

  infoCard: {
    marginHorizontal: 22,
    marginTop: 16,
    padding: 14,
    borderRadius: 17,
    backgroundColor: "#F0E8D9",
    borderWidth: 1,
    borderColor: "#E3D5BC",
    flexDirection: "row",
  },

  infoIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  infoContent: {
    flex: 1,
    marginLeft: 10,
  },

  infoTitle: {
    color: "#765728",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
  },

  infoText: {
    color: "#8C806E",
    fontSize: 9,
    lineHeight: 14,
    marginTop: 4,
  },

  // ==========================================================
  // SAVE
  // ==========================================================

  saveButton: {
    marginHorizontal: 22,
    marginTop: 20,
    height: 56,
    borderRadius: 17,
    backgroundColor: "#D6B77A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },

  saveButtonDisabled: {
    opacity: 0.65,
  },

  saveButtonText: {
    color: "#090909",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.3,
  },

  // ==========================================================
  // CANCEL
  // ==========================================================

  cancelButton: {
    alignSelf: "center",
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  cancelText: {
    color: "#8A857D",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.3,
  },

  // ==========================================================
  // COMMON
  // ==========================================================

  pressed: {
    opacity: 0.72,
  },

  // ==========================================================
  // FOOTER
  // ==========================================================

  footer: {
    marginHorizontal: 22,
    marginTop: 25,
    paddingTop: 23,
    paddingBottom: 20,
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

export default EditProfileScreen;



