import React from "react";
import { StatusBar, ScrollView, Dimensions, Linking } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons, FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Soothing color palette for parenting resources
const colors = {
  primary: "#4A6FA5",       // Soft blue
  secondary: "#6B8E23",     // Olive green
  background: "#F8F9FA",    // Very light gray
  card: "#FFFFFF",          // White cards
  textPrimary: "#2E3A4D",   // Dark blue-gray
  textSecondary: "#6C757D", // Medium gray
  accent: "#FF7E5F",        // Coral accent
  emergency: "#E63946",     // Red for emergencies
  border: "#E0E0E0",        // Light gray border
  highlight: "#E8F4F8"      // Light blue highlight
};

// Main container
const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.background};
  padding: 16px;
  padding-top: 40px;
`;

// Header section
const HeaderContainer = styled.View`
  margin-bottom: 24px;
  align-items: center;
`;

const Header = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin-bottom: 8px;
  text-align: center;
`;

const SubHeader = styled.Text`
  font-size: 16px;
  color: ${colors.textSecondary};
  text-align: center;
  line-height: 24px;
  padding-horizontal: 16px;
`;

// Resource cards
const ResourceCard = styled.TouchableOpacity`
  width: 100%;
  padding: 20px;
  margin-bottom: 16px;
  border-radius: 12px;
  background-color: ${colors.card};
  shadow-color: rgba(0,0,0,0.1);
  shadow-opacity: 0.8;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
  elevation: 3;
  border-width: 1px;
  border-color: ${colors.border};
`;

const ResourceTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: 8px;
  flex: 1;
`;

const ResourceDescription = styled.Text`
  font-size: 14px;
  color: ${colors.textSecondary};
  line-height: 20px;
  margin-bottom: 12px;
`;

const ResourceMeta = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ResourceType = styled.Text`
  font-size: 12px;
  color: white;
  background-color: ${colors.primary};
  padding: 4px 8px;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 8px;
`;

const ResourceTime = styled.Text`
  font-size: 12px;
  color: ${colors.textSecondary};
`;

const ResourceHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const IconContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${colors.highlight};
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

// Section headers
const SectionHeader = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-top: 24px;
  margin-bottom: 16px;
  padding-left: 8px;
`;

// Quick links
const QuickLinksContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const QuickLink = styled.TouchableOpacity`
  width: 48%;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 12px;
  background-color: ${colors.card};
  align-items: center;
  shadow-color: rgba(0,0,0,0.1);
  shadow-opacity: 0.8;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
  elevation: 3;
  border-width: 1px;
  border-color: ${colors.border};
`;

const QuickLinkText = styled.Text`
  font-size: 14px;
  color: ${colors.textPrimary};
  margin-top: 8px;
  text-align: center;
  font-weight: 500;
`;

// Emergency section
const EmergencyCard = styled.TouchableOpacity`
  width: 100%;
  padding: 20px;
  margin-bottom: 24px;
  border-radius: 12px;
  background-color: #FFF0F0;
  border-width: 1px;
  border-color: #FFCCCC;
`;

const EmergencyHeader = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.emergency};
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
`;

const EmergencyText = styled.Text`
  font-size: 14px;
  color: #8B0000;
  line-height: 20px;
`;

export default function ParentResources() {
  // Resource data
  const articles = [
    {
      title: "Positive Discipline Techniques",
      description: "Learn effective strategies for setting limits and encouraging good behavior without punishment.",
      type: "Article",
      time: "8 min read",
      icon: <Feather name="book-open" size={20} color={colors.primary} />,
      url: "https://www.positiveparentingsolutions.com"
    },
    {
      title: "Screen Time Guidelines by Age",
      description: "Expert recommendations for managing screen time from toddlers to teens.",
      type: "Guide",
      time: "5 min read",
      icon: <MaterialIcons name="devices" size={20} color={colors.primary} />,
      url: "https://www.healthychildren.org"
    }
  ];

  const videos = [
    {
      title: "Child CPR Demonstration",
      description: "Step-by-step video guide for infant and child CPR from certified instructors.",
      type: "Video",
      time: "12 min",
      icon: <FontAwesome5 name="heartbeat" size={20} color={colors.primary} />,
      url: "https://www.redcross.org/take-a-class/cpr"
    },
    {
      title: "Managing Toddler Tantrums",
      description: "Practical techniques for staying calm and helping your child through emotional outbursts.",
      type: "Video",
      time: "15 min",
      icon: <MaterialIcons name="child-care" size={20} color={colors.primary} />,
      url: "https://www.zerotothree.org"
    }
  ];

  const quickLinks = [
    {
      title: "Pediatricians",
      icon: <FontAwesome5 name="user-md" size={24} color={colors.primary} />,
      url: "https://www.healthychildren.org"
    },
    {
      title: "Vaccine Schedule",
      icon: <MaterialIcons name="medical-services" size={24} color={colors.primary} />,
      url: "https://www.cdc.gov/vaccines/schedules"
    },
    {
      title: "Child Development",
      icon: <MaterialIcons name="child-friendly" size={24} color={colors.primary} />,
      url: "https://www.cdc.gov/ncbddd/childdevelopment"
    },
    {
      title: "Nutrition Guide",
      icon: <MaterialIcons name="restaurant" size={24} color={colors.primary} />,
      url: "https://www.choosemyplate.gov"
    }
  ];

  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };

  return (
    <Container contentContainerStyle={{ paddingBottom: 40 }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <HeaderContainer>
        <Header>Parent Resources</Header>
        <SubHeader>
          Expert-curated information to support your parenting journey
        </SubHeader>
      </HeaderContainer>

      {/* Emergency Section */}
      <EmergencyCard onPress={() => openLink("tel:911")}>
        <EmergencyHeader>
          <Ionicons name="warning" size={20} color={colors.emergency} style={{ marginRight: 8 }} />
          Emergency Contacts
        </EmergencyHeader>
        <EmergencyText>
          Tap to call emergency services. For poison control, call 1-800-222-1222.
        </EmergencyText>
      </EmergencyCard>

      {/* Quick Links */}
      <SectionHeader>Quick Access</SectionHeader>
      <QuickLinksContainer>
        {quickLinks.map((link, index) => (
          <QuickLink key={index} onPress={() => openLink(link.url)}>
            {link.icon}
            <QuickLinkText>{link.title}</QuickLinkText>
          </QuickLink>
        ))}
      </QuickLinksContainer>

      {/* Articles */}
      <SectionHeader>Featured Articles</SectionHeader>
      {articles.map((article, index) => (
        <ResourceCard key={index} onPress={() => openLink(article.url)}>
          <ResourceHeader>
            <IconContainer>
              {article.icon}
            </IconContainer>
            <ResourceTitle>{article.title}</ResourceTitle>
          </ResourceHeader>
          <ResourceDescription>{article.description}</ResourceDescription>
          <ResourceMeta>
            <ResourceType>{article.type}</ResourceType>
            <ResourceTime>{article.time}</ResourceTime>
          </ResourceMeta>
        </ResourceCard>
      ))}

      {/* Videos */}
      <SectionHeader>Video Guides</SectionHeader>
      {videos.map((video, index) => (
        <ResourceCard key={index} onPress={() => openLink(video.url)}>
          <ResourceHeader>
            <IconContainer>
              {video.icon}
            </IconContainer>
            <ResourceTitle>{video.title}</ResourceTitle>
          </ResourceHeader>
          <ResourceDescription>{video.description}</ResourceDescription>
          <ResourceMeta>
            <ResourceType>{video.type}</ResourceType>
            <ResourceTime>{video.time}</ResourceTime>
          </ResourceMeta>
        </ResourceCard>
      ))}

      {/* Local Resources */}
      <SectionHeader>Local Resources</SectionHeader>
      <ResourceCard onPress={() => openLink("https://www.childcare.gov")}>
        <ResourceHeader>
          <IconContainer>
            <MaterialIcons name="location-on" size={20} color={colors.primary} />
          </IconContainer>
          <ResourceTitle>Find Childcare Near You</ResourceTitle>
        </ResourceHeader>
        <ResourceDescription>
          Search for licensed childcare providers in your area with verified reviews.
        </ResourceDescription>
      </ResourceCard>

      <ResourceCard onPress={() => openLink("https://www.parentsasteachers.org")}>
        <ResourceHeader>
          <IconContainer>
            <MaterialIcons name="school" size={20} color={colors.primary} />
          </IconContainer>
          <ResourceTitle>Parenting Classes</ResourceTitle>
        </ResourceHeader>
        <ResourceDescription>
          Free and low-cost parenting education programs in your community.
        </ResourceDescription>
      </ResourceCard>
    </Container>
  );
}