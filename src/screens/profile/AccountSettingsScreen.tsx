
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Moon,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react-native";

const COLORS = {
  black: "#090909",
  dark: "#151515",
  white: "#FFFFFF",
  gold: "#D6B77A",
  goldDark: "#A27A3B",
  text: "#202020",
  muted: "#8E8981",
  border: "#E5E0D8",
  light: "#F5F3EF",
  card: "#FFFFFF",
  danger: "#A34C43",
};

const AccountSettingsScreen = ({ navigation }: any) => {
  const [notifications, setNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [offers, setOffers] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("Nikhil Verma");
  const [email, setEmail] = useState("nikhil@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const saveProfile = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      Alert.alert("Missing Details", "Please fill all profile details.");
      return;
    }

    Alert.alert("Profile Updated", "Your profile details have been saved.");
  };

  const changePassword = () => {
    if (!currentPassword || !newPassword) {
      Alert.alert(
        "Missing Details",
        "Please enter your current and new password."
      );
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert(
        "Weak Password",
        "Your new password should contain at least 6 characters."
      );
      return;
    }

    setCurrentPassword("");
    setNewPassword("");

    Alert.alert("Password Updated", "Your password has been changed.");
  };

  const deleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone. Are you sure you want to continue?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Account Deletion",
              "Account deletion will be connected to the backend."
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={21} color={COLORS.white} />
          </Pressable>

          <View style={styles.headerCenter}>
            <Text style={styles.headerSmall}>I&T FASHION</Text>
            <Text style={styles.headerTitle}>ACCOUNT SETTINGS</Text>
          </View>

          <View style={styles.headerIcon}>
            <ShieldCheck size={19} color={COLORS.gold} />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Intro */}
          <View style={styles.intro}>
            <Text style={styles.eyebrow}>ACCOUNT & SECURITY</Text>
            <Text style={styles.heading}>Settings</Text>
            <Text style={styles.description}>
              Manage your personal information, security and app preferences.
            </Text>
          </View>

          {/* Personal Information */}
          <SectionTitle
            eyebrow="PERSONAL"
            title="Personal Information"
          />

          <View style={styles.card}>
            <InputField
              label="FULL NAME"
              value={name}
              onChangeText={setName}
              icon={<UserRound size={17} color={COLORS.goldDark} />}
            />

            <InputField
              label="EMAIL ADDRESS"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              icon={<Mail size={17} color={COLORS.goldDark} />}
            />

            <InputField
              label="PHONE NUMBER"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              icon={<Phone size={17} color={COLORS.goldDark} />}
            />

            <Pressable
              style={({ pressed }) => [
                styles.saveButton,
                pressed && styles.pressed,
              ]}
              onPress={saveProfile}
            >
              <Save size={16} color={COLORS.black} />
              <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
            </Pressable>
          </View>

          {/* Password */}
          <SectionTitle
            eyebrow="SECURITY"
            title="Change Password"
          />

          <View style={styles.card}>
            <Text style={styles.inputLabel}>CURRENT PASSWORD</Text>

            <View style={styles.passwordBox}>
              <Lock size={17} color={COLORS.goldDark} />

              <TextInput
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showPassword}
                placeholder="Enter current password"
                placeholderTextColor="#AAA59D"
                style={styles.passwordInput}
              />

              <Pressable onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={18} color={COLORS.muted} />
                ) : (
                  <Eye size={18} color={COLORS.muted} />
                )}
              </Pressable>
            </View>

            <Text style={styles.inputLabel}>NEW PASSWORD</Text>

            <View style={styles.passwordBox}>
              <Lock size={17} color={COLORS.goldDark} />

              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showPassword}
                placeholder="Enter new password"
                placeholderTextColor="#AAA59D"
                style={styles.passwordInput}
              />

              <Pressable onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={18} color={COLORS.muted} />
                ) : (
                  <Eye size={18} color={COLORS.muted} />
                )}
              </Pressable>
            </View>

            <Text style={styles.passwordHint}>
              Use at least 6 characters for a stronger password.
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.outlineButton,
                pressed && styles.pressed,
              ]}
              onPress={changePassword}
            >
              <Lock size={15} color={COLORS.goldDark} />
              <Text style={styles.outlineButtonText}>
                UPDATE PASSWORD
              </Text>
            </Pressable>
          </View>

          {/* Notifications */}
          <SectionTitle
            eyebrow="PREFERENCES"
            title="Notifications"
          />

          <View style={styles.card}>
            <SettingRow
              icon={<Bell size={18} color={COLORS.goldDark} />}
              title="Push Notifications"
              subtitle="Receive updates and important alerts"
              value={notifications}
              onValueChange={setNotifications}
            />

            <SettingRow
              icon={<ShieldCheck size={18} color={COLORS.goldDark} />}
              title="Order Updates"
              subtitle="Shipping and delivery notifications"
              value={orderUpdates}
              onValueChange={setOrderUpdates}
            />

            <SettingRow
              icon={<Mail size={18} color={COLORS.goldDark} />}
              title="Offers & Promotions"
              subtitle="Get exclusive I&T fashion offers"
              value={offers}
              onValueChange={setOffers}
              last
            />
          </View>

          {/* App Preferences */}
          <SectionTitle
            eyebrow="APP"
            title="App Preferences"
          />

          <View style={styles.card}>
            <SettingRow
              icon={<Moon size={18} color={COLORS.goldDark} />}
              title="Dark Mode"
              subtitle="Use dark appearance throughout the app"
              value={darkMode}
              onValueChange={(value) => {
                setDarkMode(value);

                Alert.alert(
                  "Dark Mode",
                  "Full dark mode theme will be available soon."
                );
              }}
              last
            />
          </View>

          {/* Privacy */}
          <SectionTitle
            eyebrow="PRIVACY"
            title="Privacy & Security"
          />

          <View style={styles.actionCard}>
            <ActionRow
              icon={<ShieldCheck size={18} color={COLORS.goldDark} />}
              title="Privacy & Data"
              subtitle="Manage how your information is used"
              onPress={() =>
                Alert.alert(
                  "Privacy & Data",
                  "Privacy controls will be available soon."
                )
              }
            />

            <ActionRow
              icon={<Lock size={18} color={COLORS.goldDark} />}
              title="Login & Security"
              subtitle="Review your account security"
              onPress={() =>
                Alert.alert(
                  "Login & Security",
                  "Security information will be available soon."
                )
              }
            />

            <ActionRow
              icon={<UserRound size={18} color={COLORS.goldDark} />}
              title="Login Activity"
              subtitle="Review recent account activity"
              onPress={() =>
                Alert.alert(
                  "Login Activity",
                  "Login activity will be available soon."
                )
              }
              last
            />
          </View>

          {/* Delete */}
          <Pressable
            style={({ pressed }) => [
              styles.deleteButton,
              pressed && styles.pressed,
            ]}
            onPress={deleteAccount}
          >
            <Text style={styles.deleteText}>DELETE MY ACCOUNT</Text>
          </Pressable>

          {/* Security */}
          <View style={styles.securityCard}>
            <ShieldCheck size={20} color={COLORS.goldDark} />

            <View style={styles.securityContent}>
              <Text style={styles.securityTitle}>
                YOUR ACCOUNT IS PROTECTED
              </Text>

              <Text style={styles.securityText}>
                We use secure authentication and encryption to protect your
                account information.
              </Text>
            </View>
          </View>

          {/* Footer */}
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
    </SafeAreaView>
  );
};

/* ==========================================================
   REUSABLE COMPONENTS
========================================================== */

const SectionTitle = ({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionEyebrow}>{eyebrow}</Text>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

const InputField = ({
  label,
  value,
  onChangeText,
  icon,
  keyboardType = "default",
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  icon: React.ReactNode;
  keyboardType?: any;
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>

    <View style={styles.inputBox}>
      {icon}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholderTextColor="#AAA59D"
        style={styles.textInput}
      />
    </View>
  </View>
);

const SettingRow = ({
  icon,
  title,
  subtitle,
  value,
  onValueChange,
  last = false,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  last?: boolean;
}) => (
  <View style={[styles.settingRow, !last && styles.rowBorder]}>
    <View style={styles.settingIcon}>{icon}</View>

    <View style={styles.settingContent}>
      <Text style={styles.settingTitle}>{title}</Text>
      <Text style={styles.settingSubtitle}>{subtitle}</Text>
    </View>

    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{
        false: "#D8D3CA",
        true: "#C9A86A",
      }}
      thumbColor={value ? "#FFFFFF" : "#F4F1EA"}
    />
  </View>
);

const ActionRow = ({
  icon,
  title,
  subtitle,
  onPress,
  last = false,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
  last?: boolean;
}) => (
  <Pressable
    style={[styles.actionRow, !last && styles.rowBorder]}
    onPress={onPress}
  >
    <View style={styles.settingIcon}>{icon}</View>

    <View style={styles.settingContent}>
      <Text style={styles.settingTitle}>{title}</Text>
      <Text style={styles.settingSubtitle}>{subtitle}</Text>
    </View>

    <ChevronRight size={18} color="#AAA59D" />
  </Pressable>
);

/* ==========================================================
   STYLES
========================================================== */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.black,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },

  header: {
    height: 78,
    backgroundColor: COLORS.black,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#292929",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#151515",
    alignItems: "center",
    justifyContent: "center",
  },

  headerCenter: {
    flex: 1,
    alignItems: "center",
  },

  headerSmall: {
    color: COLORS.gold,
    fontSize: 9,
    letterSpacing: 2.5,
    fontWeight: "600",
  },

  headerTitle: {
    color: COLORS.white,
    fontSize: 15,
    letterSpacing: 1.8,
    fontWeight: "800",
    marginTop: 3,
  },

  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#151515",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 40,
  },

  intro: {
    marginBottom: 8,
  },

  eyebrow: {
    color: COLORS.goldDark,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2,
  },

  heading: {
    color: COLORS.text,
    fontSize: 29,
    fontWeight: "800",
    marginTop: 4,
  },

  description: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 6,
  },

  sectionHeader: {
    marginTop: 26,
    marginBottom: 12,
  },

  sectionEyebrow: {
    color: COLORS.goldDark,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 2,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 21,
    fontWeight: "700",
    marginTop: 2,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 15,
  },

  inputContainer: {
    marginBottom: 13,
  },

  inputLabel: {
    color: "#777169",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 6,
  },

  inputBox: {
    height: 47,
    borderRadius: 10,
    backgroundColor: "#FAF9F6",
    borderWidth: 1,
    borderColor: "#E4DED5",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  textInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 12,
    marginLeft: 9,
  },

  saveButton: {
    height: 46,
    borderRadius: 11,
    backgroundColor: COLORS.gold,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginTop: 2,
  },

  saveButtonText: {
    color: COLORS.black,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },

  passwordBox: {
    height: 47,
    borderRadius: 10,
    backgroundColor: "#FAF9F6",
    borderWidth: 1,
    borderColor: "#E4DED5",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 14,
  },

  passwordInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 12,
    marginLeft: 9,
  },

  passwordHint: {
    color: COLORS.muted,
    fontSize: 9,
    marginTop: -3,
    marginBottom: 14,
  },

  outlineButton: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gold,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  outlineButtonText: {
    color: COLORS.goldDark,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },

  settingRow: {
    minHeight: 69,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#EFEBE5",
  },

  settingIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: "#F3EBDD",
    alignItems: "center",
    justifyContent: "center",
  },

  settingContent: {
    flex: 1,
    marginLeft: 11,
    marginRight: 8,
  },

  settingTitle: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "700",
  },

  settingSubtitle: {
    color: COLORS.muted,
    fontSize: 9,
    lineHeight: 14,
    marginTop: 3,
  },

  actionCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },

  actionRow: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  deleteButton: {
    height: 49,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#E4C8C4",
    backgroundColor: "#FFF8F6",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },

  deleteText: {
    color: COLORS.danger,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  securityCard: {
    marginTop: 18,
    padding: 14,
    borderRadius: 16,
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

  pressed: {
    opacity: 0.7,
  },

  footer: {
    alignItems: "center",
    marginTop: 30,
    paddingTop: 23,
    borderTopWidth: 1,
    borderTopColor: "#DDD8CF",
  },

  footerBrand: {
    color: COLORS.goldDark,
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

export default AccountSettingsScreen;




