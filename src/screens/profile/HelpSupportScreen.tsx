
import React, { useState } from "react";
import {
  Alert,
  Linking,
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
  ChevronDown,
  ChevronRight,
  Clock3,
  Mail,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  ShoppingBag,
  Truck,
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
};

const faqs = [
  {
    question: "How can I track my order?",
    answer:
      "Open My Orders from your profile and select the order you want to track. You will be able to view its current delivery status.",
  },
  {
    question: "How can I cancel my order?",
    answer:
      "Cancellation depends on the current order status. Open your order and check whether cancellation is available.",
  },
  {
    question: "How do I return a product?",
    answer:
      "Open your delivered order and choose the return option if the product is eligible according to the return policy.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery time depends on your location and product availability. The estimated delivery date is shown during checkout and in your order details.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "I&T FASHION supports the payment options available during checkout, including online payment and Cash on Delivery where available.",
  },
  {
    question: "How can I change my delivery address?",
    answer:
      "Go to Profile → My Addresses to add, remove or manage your saved delivery addresses.",
  },
];

const HelpSupportScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  const callSupport = () => {
    Linking.openURL("tel:+919876543210").catch(() => {
      Alert.alert("Unable to Call", "Calling is not available on this device.");
    });
  };

  const emailSupport = () => {
    Linking.openURL("mailto:support@iandtfashion.com").catch(() => {
      Alert.alert(
        "Unable to Open Email",
        "No email application is available on this device."
      );
    });
  };

  const liveChat = () => {
    Alert.alert(
      "Live Chat",
      "Live chat support will be connected to the support system soon."
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
            <Text style={styles.headerTitle}>HELP & SUPPORT</Text>
          </View>

          <View style={styles.headerIcon}>
            <ShieldCheck size={19} color={COLORS.gold} />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Hero */}
          <View style={styles.hero}>
            <View style={styles.heroIcon}>
              <MessageCircle size={27} color={COLORS.gold} />
            </View>

            <Text style={styles.heroEyebrow}>WE'RE HERE TO HELP</Text>

            <Text style={styles.heroTitle}>
              How can we help{"\n"}you today?
            </Text>

            <Text style={styles.heroText}>
              Find answers, track your orders or get in touch with our support
              team.
            </Text>
          </View>

          {/* Search */}
          <View style={styles.searchBox}>
            <Search size={18} color={COLORS.muted} />

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search for help..."
              placeholderTextColor="#9B968E"
              style={styles.searchInput}
            />
          </View>

          {/* Quick Help */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionEyebrow}>QUICK HELP</Text>
            <Text style={styles.sectionTitle}>What do you need?</Text>
          </View>

          <View style={styles.quickGrid}>
            <QuickHelp
              icon={<ShoppingBag size={21} color={COLORS.goldDark} />}
              title="My Orders"
              subtitle="Track your order"
              onPress={() => navigation.navigate("MyOrders")}
            />

            <QuickHelp
              icon={<Truck size={21} color={COLORS.goldDark} />}
              title="Delivery"
              subtitle="Shipping information"
              onPress={() =>
                Alert.alert(
                  "Delivery Information",
                  "Delivery information will be shown here."
                )
              }
            />

            <QuickHelp
              icon={<MessageCircle size={21} color={COLORS.goldDark} />}
              title="Returns"
              subtitle="Return a product"
              onPress={() =>
                Alert.alert(
                  "Returns",
                  "Return information will be shown here."
                )
              }
            />

            <QuickHelp
              icon={<ShieldCheck size={21} color={COLORS.goldDark} />}
              title="Payments"
              subtitle="Payment help"
              onPress={() =>
                Alert.alert(
                  "Payments",
                  "Payment support information will be shown here."
                )
              }
            />
          </View>

          {/* FAQ */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionEyebrow}>FAQ</Text>
            <Text style={styles.sectionTitle}>Frequently Asked</Text>
          </View>

          <View style={styles.faqContainer}>
            {filteredFaqs.length === 0 ? (
              <View style={styles.noResult}>
                <Search size={25} color={COLORS.goldDark} />
                <Text style={styles.noResultTitle}>NO RESULTS</Text>
                <Text style={styles.noResultText}>
                  We couldn't find an answer matching your search.
                </Text>
              </View>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <View
                    key={faq.question}
                    style={[
                      styles.faqItem,
                      index !== filteredFaqs.length - 1 &&
                        styles.faqBorder,
                    ]}
                  >
                    <Pressable
                      style={styles.faqQuestion}
                      onPress={() =>
                        setOpenFaq(isOpen ? null : index)
                      }
                    >
                      <Text style={styles.questionText}>
                        {faq.question}
                      </Text>

                      {isOpen ? (
                        <ChevronDown size={18} color={COLORS.goldDark} />
                      ) : (
                        <ChevronRight size={18} color="#AAA59D" />
                      )}
                    </Pressable>

                    {isOpen && (
                      <Text style={styles.answerText}>{faq.answer}</Text>
                    )}
                  </View>
                );
              })
            )}
          </View>

          {/* Contact */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionEyebrow}>CONTACT US</Text>
            <Text style={styles.sectionTitle}>Still need help?</Text>
          </View>

          <View style={styles.contactCard}>
            <ContactRow
              icon={<Phone size={19} color={COLORS.goldDark} />}
              title="Call Us"
              subtitle="Mon - Sat • 10:00 AM - 7:00 PM"
              action="CALL"
              onPress={callSupport}
            />

            <ContactRow
              icon={<Mail size={19} color={COLORS.goldDark} />}
              title="Email Support"
              subtitle="We usually reply within 24 hours"
              action="EMAIL"
              onPress={emailSupport}
            />

            <ContactRow
              icon={<MessageCircle size={19} color={COLORS.goldDark} />}
              title="Live Chat"
              subtitle="Chat with our support team"
              action="CHAT"
              onPress={liveChat}
              last
            />
          </View>

          {/* Support Hours */}
          <View style={styles.hoursCard}>
            <View style={styles.hoursIcon}>
              <Clock3 size={20} color={COLORS.goldDark} />
            </View>

            <View style={styles.hoursContent}>
              <Text style={styles.hoursTitle}>SUPPORT HOURS</Text>
              <Text style={styles.hoursText}>
                Monday - Saturday • 10:00 AM - 7:00 PM
              </Text>
              <Text style={styles.hoursSub}>
                Sundays & public holidays may have limited support.
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
   COMPONENTS
========================================================== */

const QuickHelp = ({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
}) => (
  <Pressable
    style={({ pressed }) => [
      styles.quickCard,
      pressed && styles.pressed,
    ]}
    onPress={onPress}
  >
    <View style={styles.quickIcon}>{icon}</View>

    <Text style={styles.quickTitle}>{title}</Text>
    <Text style={styles.quickSubtitle}>{subtitle}</Text>

    <ChevronRight
      size={15}
      color="#AAA59D"
      style={styles.quickArrow}
    />
  </Pressable>
);

const ContactRow = ({
  icon,
  title,
  subtitle,
  action,
  onPress,
  last = false,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action: string;
  onPress: () => void;
  last?: boolean;
}) => (
  <View style={[styles.contactRow, !last && styles.contactBorder]}>
    <View style={styles.contactIcon}>{icon}</View>

    <View style={styles.contactContent}>
      <Text style={styles.contactTitle}>{title}</Text>
      <Text style={styles.contactSubtitle}>{subtitle}</Text>
    </View>

    <Pressable style={styles.contactButton} onPress={onPress}>
      <Text style={styles.contactButtonText}>{action}</Text>
    </Pressable>
  </View>
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
    paddingTop: 22,
    paddingBottom: 40,
  },

  // HERO

  hero: {
    backgroundColor: COLORS.black,
    borderRadius: 22,
    padding: 22,
    overflow: "hidden",
  },

  heroIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#171717",
    borderWidth: 1,
    borderColor: "#393939",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 17,
  },

  heroEyebrow: {
    color: COLORS.gold,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 2,
  },

  heroTitle: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: "800",
    lineHeight: 34,
    marginTop: 7,
  },

  heroText: {
    color: "#A8A39B",
    fontSize: 11,
    lineHeight: 18,
    marginTop: 8,
    maxWidth: 300,
  },

  // SEARCH

  searchBox: {
    height: 51,
    marginTop: 14,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  searchInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 12,
    marginLeft: 9,
  },

  // SECTION

  sectionHeader: {
    marginTop: 28,
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

  // QUICK HELP

  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  quickCard: {
    width: "48.3%",
    minHeight: 135,
    backgroundColor: COLORS.white,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 13,
  },

  quickIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#F3EBDD",
    alignItems: "center",
    justifyContent: "center",
  },

  quickTitle: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 13,
  },

  quickSubtitle: {
    color: COLORS.muted,
    fontSize: 9,
    marginTop: 4,
    paddingRight: 8,
  },

  quickArrow: {
    position: "absolute",
    right: 13,
    bottom: 13,
  },

  // FAQ

  faqContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },

  faqItem: {
    paddingHorizontal: 14,
    paddingVertical: 15,
  },

  faqBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#EFEBE5",
  },

  faqQuestion: {
    flexDirection: "row",
    alignItems: "center",
  },

  questionText: {
    flex: 1,
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 17,
    paddingRight: 10,
  },

  answerText: {
    color: COLORS.muted,
    fontSize: 10,
    lineHeight: 17,
    marginTop: 10,
    paddingRight: 25,
  },

  noResult: {
    alignItems: "center",
    paddingVertical: 35,
    paddingHorizontal: 20,
  },

  noResultTitle: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: 10,
  },

  noResultText: {
    color: COLORS.muted,
    fontSize: 10,
    textAlign: "center",
    marginTop: 5,
  },

  // CONTACT

  contactCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },

  contactRow: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
  },

  contactBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#EFEBE5",
  },

  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F3EBDD",
    alignItems: "center",
    justifyContent: "center",
  },

  contactContent: {
    flex: 1,
    marginLeft: 11,
    marginRight: 8,
  },

  contactTitle: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "800",
  },

  contactSubtitle: {
    color: COLORS.muted,
    fontSize: 8,
    lineHeight: 13,
    marginTop: 4,
  },

  contactButton: {
    height: 32,
    paddingHorizontal: 11,
    borderRadius: 8,
    backgroundColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
  },

  contactButtonText: {
    color: COLORS.black,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.8,
  },

  // HOURS

  hoursCard: {
    marginTop: 14,
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#F0E8D9",
    borderWidth: 1,
    borderColor: "#E3D5BC",
    flexDirection: "row",
    alignItems: "center",
  },

  hoursIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#E8DCC8",
    alignItems: "center",
    justifyContent: "center",
  },

  hoursContent: {
    flex: 1,
    marginLeft: 10,
  },

  hoursTitle: {
    color: "#765728",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },

  hoursText: {
    color: "#806E51",
    fontSize: 9,
    marginTop: 4,
  },

  hoursSub: {
    color: "#9A8D79",
    fontSize: 8,
    marginTop: 3,
  },

  pressed: {
    opacity: 0.7,
  },

  // FOOTER

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

export default HelpSupportScreen;
