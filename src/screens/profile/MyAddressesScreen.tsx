
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  ArrowLeft,
  Check,
  Home,
  MapPin,
  Navigation,
  Pencil,
  Plus,
  Trash2,
  BriefcaseBusiness,
} from "lucide-react-native";

const COLORS = {
  black: "#090909",
  card: "#141414",
  card2: "#181818",
  gold: "#D6B77A",
  champagne: "#E7D5AA",
  white: "#FFFFFF",
  muted: "#A3A3A3",
  border: "#292929",
  red: "#D87878",
};

type Address = {
  id: string;
  type: "Home" | "Work" | "Other";
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
};

const initialAddresses: Address[] = [
  {
    id: "1",
    type: "Home",
    name: "Nikhil Verma",
    phone: "+91 98765 43210",
    address: "House No. 21, Main Road",
    city: "Gurgaon",
    state: "Haryana",
    pincode: "122001",
    isDefault: true,
  },
  {
    id: "2",
    type: "Work",
    name: "Nikhil Verma",
    phone: "+91 98765 43210",
    address: "Business Park, Sector 44",
    city: "Gurgaon",
    state: "Haryana",
    pincode: "122003",
    isDefault: false,
  },
];

const MyAddressesScreen = ({ navigation }: any) => {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const resetForm = () => {
    setForm({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((current) =>
      current.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  };

  const deleteAddress = (id: string) => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setAddresses((current) =>
              current.filter((address) => address.id !== id)
            );
          },
        },
      ]
    );
  };

  const addAddress = () => {
    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.city.trim() ||
      !form.state.trim() ||
      !form.pincode.trim()
    ) {
      Alert.alert("Missing Details", "Please fill all address fields.");
      return;
    }

    if (form.pincode.trim().length !== 6) {
      Alert.alert("Invalid Pincode", "Please enter a valid 6-digit pincode.");
      return;
    }

    const newAddress: Address = {
      id: Date.now().toString(),
      type: "Home",
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      pincode: form.pincode.trim(),
      isDefault: addresses.length === 0,
    };

    setAddresses((current) => [...current, newAddress]);

    resetForm();
    setShowForm(false);

    Alert.alert("Address Added", "Your new address has been saved.");
  };

  const getIcon = (type: Address["type"]) => {
    if (type === "Work") {
      return <BriefcaseBusiness size={20} color={COLORS.gold} />;
    }

    if (type === "Other") {
      return <MapPin size={20} color={COLORS.gold} />;
    }

    return <Home size={20} color={COLORS.gold} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.black}
      />

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
            <Text style={styles.headerTitle}>MY ADDRESSES</Text>
          </View>

          <View style={styles.headerIcon}>
            <Navigation size={19} color={COLORS.gold} />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Intro */}
          <View style={styles.intro}>
            <Text style={styles.eyebrow}>DELIVERY DETAILS</Text>
            <Text style={styles.heading}>Your Addresses</Text>
            <Text style={styles.description}>
              Manage your saved delivery addresses for faster checkout.
            </Text>
          </View>

          {/* Add button */}
          <Pressable
            style={styles.addButton}
            onPress={() => {
              resetForm();
              setShowForm((value) => !value);
            }}
          >
            <View style={styles.addIcon}>
              <Plus size={19} color={COLORS.black} />
            </View>

            <View style={styles.addContent}>
              <Text style={styles.addTitle}>
                {showForm ? "CLOSE FORM" : "ADD NEW ADDRESS"}
              </Text>
              <Text style={styles.addSubtitle}>
                {showForm
                  ? "Cancel adding a new address"
                  : "Save a new delivery location"}
              </Text>
            </View>
          </Pressable>

          {/* Address Form */}
          {showForm && (
            <View style={styles.formCard}>
              <View style={styles.formHeader}>
                <View>
                  <Text style={styles.formTitle}>NEW ADDRESS</Text>
                  <Text style={styles.formSubtitle}>
                    Enter your delivery details
                  </Text>
                </View>

                <MapPin size={20} color={COLORS.gold} />
              </View>

              <View style={styles.inputRow}>
                <View style={styles.halfInput}>
                  <Text style={styles.inputLabel}>FULL NAME</Text>
                  <TextInput
                    value={form.name}
                    onChangeText={(value) =>
                      setForm((current) => ({ ...current, name: value }))
                    }
                    placeholder="Your name"
                    placeholderTextColor="#666666"
                    style={styles.input}
                  />
                </View>

                <View style={styles.halfInput}>
                  <Text style={styles.inputLabel}>PHONE</Text>
                  <TextInput
                    value={form.phone}
                    onChangeText={(value) =>
                      setForm((current) => ({ ...current, phone: value }))
                    }
                    placeholder="Phone number"
                    placeholderTextColor="#666666"
                    keyboardType="phone-pad"
                    style={styles.input}
                  />
                </View>
              </View>

              <Text style={styles.inputLabel}>ADDRESS</Text>
              <TextInput
                value={form.address}
                onChangeText={(value) =>
                  setForm((current) => ({ ...current, address: value }))
                }
                placeholder="House / Flat / Street / Area"
                placeholderTextColor="#666666"
                multiline
                style={[styles.input, styles.addressInput]}
              />

              <View style={styles.inputRow}>
                <View style={styles.halfInput}>
                  <Text style={styles.inputLabel}>CITY</Text>
                  <TextInput
                    value={form.city}
                    onChangeText={(value) =>
                      setForm((current) => ({ ...current, city: value }))
                    }
                    placeholder="City"
                    placeholderTextColor="#666666"
                    style={styles.input}
                  />
                </View>

                <View style={styles.halfInput}>
                  <Text style={styles.inputLabel}>STATE</Text>
                  <TextInput
                    value={form.state}
                    onChangeText={(value) =>
                      setForm((current) => ({ ...current, state: value }))
                    }
                    placeholder="State"
                    placeholderTextColor="#666666"
                    style={styles.input}
                  />
                </View>
              </View>

              <Text style={styles.inputLabel}>PINCODE</Text>
              <TextInput
                value={form.pincode}
                onChangeText={(value) =>
                  setForm((current) => ({
                    ...current,
                    pincode: value.replace(/[^0-9]/g, "").slice(0, 6),
                  }))
                }
                placeholder="6-digit pincode"
                placeholderTextColor="#666666"
                keyboardType="number-pad"
                maxLength={6}
                style={styles.input}
              />

              <Pressable style={styles.saveButton} onPress={addAddress}>
                <Check size={17} color={COLORS.black} />
                <Text style={styles.saveButtonText}>SAVE ADDRESS</Text>
              </Pressable>
            </View>
          )}

          {/* Saved Addresses */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>SAVED ADDRESSES</Text>
            <Text style={styles.addressCount}>
              {addresses.length} SAVED
            </Text>
          </View>

          {addresses.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <MapPin size={34} color={COLORS.gold} />
              </View>

              <Text style={styles.emptyTitle}>NO SAVED ADDRESSES</Text>

              <Text style={styles.emptyText}>
                Add a delivery address to make your checkout faster.
              </Text>
            </View>
          ) : (
            addresses.map((address) => (
              <View key={address.id} style={styles.addressCard}>
                <View style={styles.addressTop}>
                  <View style={styles.addressType}>
                    <View style={styles.typeIcon}>
                      {getIcon(address.type)}
                    </View>

                    <View>
                      <Text style={styles.typeTitle}>{address.type}</Text>

                      {address.isDefault && (
                        <View style={styles.defaultBadge}>
                          <Check size={10} color={COLORS.black} />
                          <Text style={styles.defaultText}>DEFAULT</Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <View style={styles.actionRow}>
                    <Pressable
                      style={styles.actionButton}
                      onPress={() =>
                        Alert.alert(
                          "Edit Address",
                          "Address editing will be connected to the API next."
                        )
                      }
                    >
                      <Pencil size={16} color={COLORS.white} />
                    </Pressable>

                    <Pressable
                      style={[styles.actionButton, styles.deleteAction]}
                      onPress={() => deleteAddress(address.id)}
                    >
                      <Trash2 size={16} color={COLORS.red} />
                    </Pressable>
                  </View>
                </View>

                <View style={styles.addressDivider} />

                <Text style={styles.personName}>{address.name}</Text>
                <Text style={styles.phone}>{address.phone}</Text>

                <Text style={styles.addressText}>{address.address}</Text>

                <Text style={styles.addressText}>
                  {address.city}, {address.state} - {address.pincode}
                </Text>

                {!address.isDefault && (
                  <Pressable
                    style={styles.defaultButton}
                    onPress={() => {
                      setDefaultAddress(address.id);
                      Alert.alert(
                        "Default Address",
                        "This address is now your default delivery address."
                      );
                    }}
                  >
                    <Text style={styles.defaultButtonText}>
                      MAKE DEFAULT
                    </Text>
                  </Pressable>
                )}
              </View>
            ))
          )}

          {/* Security */}
          <View style={styles.securityCard}>
            <View style={styles.securityIcon}>
              <Navigation size={20} color={COLORS.gold} />
            </View>

            <View style={styles.securityContent}>
              <Text style={styles.securityTitle}>
                YOUR ADDRESS IS SECURE
              </Text>
              <Text style={styles.securityText}>
                Your delivery information is used only to process and deliver
                your orders.
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerBrand}>I&T</Text>
            <Text style={styles.footerText}>FASHION</Text>
            <Text style={styles.footerSub}>
              Timeless style. Everyday luxury.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.black,
  },

  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },

  header: {
    height: 78,
    backgroundColor: COLORS.black,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.card,
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
    marginTop: 3,
    color: COLORS.white,
    fontSize: 17,
    letterSpacing: 2.2,
    fontWeight: "800",
  },

  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 35,
  },

  intro: {
    marginBottom: 18,
  },

  eyebrow: {
    color: COLORS.gold,
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: "700",
  },

  heading: {
    marginTop: 6,
    color: COLORS.white,
    fontSize: 29,
    fontWeight: "800",
  },

  description: {
    marginTop: 7,
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 20,
  },

  addButton: {
    minHeight: 70,
    borderRadius: 17,
    backgroundColor: COLORS.gold,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 22,
  },

  addIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: "rgba(0,0,0,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },

  addContent: {
    marginLeft: 12,
  },

  addTitle: {
    color: COLORS.black,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
  },

  addSubtitle: {
    marginTop: 4,
    color: "#4E4637",
    fontSize: 10,
  },

  formCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  formTitle: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  formSubtitle: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 4,
  },

  inputRow: {
    flexDirection: "row",
    gap: 10,
  },

  halfInput: {
    flex: 1,
  },

  inputLabel: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 7,
    marginTop: 4,
  },

  input: {
    height: 46,
    backgroundColor: COLORS.card2,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    color: COLORS.white,
    fontSize: 12,
    marginBottom: 12,
  },

  addressInput: {
    height: 75,
    paddingTop: 12,
    textAlignVertical: "top",
  },

  saveButton: {
    height: 48,
    borderRadius: 11,
    backgroundColor: COLORS.gold,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    gap: 7,
  },

  saveButtonText: {
    color: COLORS.black,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.4,
  },

  addressCount: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: "700",
  },

  addressCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  addressTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  addressType: {
    flexDirection: "row",
    alignItems: "center",
  },

  typeIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#202020",
    alignItems: "center",
    justifyContent: "center",
  },

  typeTitle: {
    marginLeft: 11,
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },

  defaultBadge: {
    marginTop: 5,
    marginLeft: 11,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gold,
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 3,
  },

  defaultText: {
    color: COLORS.black,
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  actionRow: {
    flexDirection: "row",
    gap: 7,
  },

  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#202020",
    alignItems: "center",
    justifyContent: "center",
  },

  deleteAction: {
    borderWidth: 1,
    borderColor: "#372222",
  },

  addressDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },

  personName: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "700",
  },

  phone: {
    color: COLORS.gold,
    fontSize: 11,
    marginTop: 4,
  },

  addressText: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 8,
  },

  defaultButton: {
    height: 38,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },

  defaultButtonText: {
    color: COLORS.gold,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },

  emptyState: {
    alignItems: "center",
    paddingVertical: 55,
    paddingHorizontal: 25,
  },

  emptyIcon: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginTop: 18,
  },

  emptyText: {
    color: COLORS.muted,
    textAlign: "center",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 8,
  },

  securityCard: {
    marginTop: 10,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
  },

  securityIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
  },

  securityContent: {
    flex: 1,
    marginLeft: 12,
  },

  securityTitle: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  securityText: {
    color: COLORS.muted,
    fontSize: 9,
    lineHeight: 15,
    marginTop: 4,
  },

  footer: {
    alignItems: "center",
    paddingTop: 35,
  },

  footerBrand: {
    color: COLORS.gold,
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 3,
  },

  footerText: {
    marginTop: -2,
    color: COLORS.white,
    fontSize: 9,
    letterSpacing: 3,
    fontWeight: "700",
  },

  footerSub: {
    marginTop: 8,
    color: COLORS.muted,
    fontSize: 10,
  },
});

export default MyAddressesScreen;
