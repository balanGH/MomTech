import React from "react";
import { StatusBar, Image, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import styled from "styled-components/native";
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Modern teal color palette with better contrast
const colors = {
  primary: "#007A7A",       // Darker teal for better accessibility
  secondary: "#00A89E",     // Vibrant teal
  background: "#F5FDFD",    // Very light teal background
  card: "#FFFFFF",          // Pure white cards
  textPrimary: "#002E2E",   // Dark teal for text
  textSecondary: "#5A7A7A", // Muted teal
  accent: "#4DC9C5",        // Soft teal accent
  emergency: "#FF5252",     // Bright red for emergencies
  border: "#D1E8E8",        // Light teal border
  highlight: "#E0F7F7"      // For subtle highlights
};

// Main container with safe area padding
const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.background};
  padding: 16px;
  padding-top: 40px;
`;

// Brand header with better mobile scaling
const BrandHeader = styled.View`
  align-items: center;
  margin-bottom: 20px;
  padding: 16px;
  background-color: ${colors.card};
  border-radius: 16px;
  shadow-color: rgba(0,0,0,0.1);
  shadow-opacity: 0.8;
  shadow-radius: 12px;
  shadow-offset: 0px 4px;
  elevation: 4;
  margin-horizontal: 4px;
`;

const BrandLogo = styled.Image`
  width: ${width * 0.7}px;
  height: ${width * 0.3}px;
  resize-mode: contain;
  margin-bottom: 8px;
`;

const BrandTagline = styled.Text`
  font-size: 16px;
  color: ${colors.primary};
  text-align: center;
  font-weight: 600;
  margin-top: 4px;
`;

// Header section with better mobile spacing
const HeaderContainer = styled.View`
  align-items: center;
  margin-bottom: 24px;
  padding-horizontal: 8px;
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
  padding-horizontal: 8px;
`;

// Stats cards with better mobile layout
const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-horizontal: 4px;
`;

const StatCard = styled.View`
  width: 48%;
  padding: 16px;
  border-radius: 14px;
  background-color: ${colors.card};
  shadow-color: rgba(0,0,0,0.08);
  shadow-opacity: 1;
  shadow-radius: 8px;
  shadow-offset: 0px 3px;
  elevation: 3;
  border-width: 1px;
  border-color: ${colors.border};
`;

const StatValue = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${colors.primary};
  margin-bottom: 4px;
`;

const StatLabel = styled.Text`
  font-size: 14px;
  color: ${colors.textSecondary};
`;

// Feature card with better padding
const FeatureCard = styled.View`
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 16px;
  background-color: ${colors.card};
  shadow-color: rgba(0,0,0,0.1);
  shadow-opacity: 0.8;
  shadow-radius: 12px;
  shadow-offset: 0px 4px;
  elevation: 4;
  border-width: 1px;
  border-color: ${colors.border};
`;

const FeatureText = styled.Text`
  font-size: 16px;
  color: ${colors.textPrimary};
  line-height: 24px;
  text-align: center;
`;

// Buttons with better touch targets
const ButtonGrid = styled.View`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 20px;
  padding-horizontal: 4px;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 18px;
  margin-bottom: 16px;
  border-radius: 12px;
  background-color: ${props => 
    props.emergency ? colors.emergency : 
    props.secondary ? colors.secondary : 
    colors.primary};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  shadow-color: ${props => 
    props.emergency ? 'rgba(255, 77, 77, 0.3)' : 
    props.secondary ? 'rgba(0, 168, 158, 0.3)' : 
    'rgba(0, 122, 122, 0.3)'};
  shadow-opacity: 0.8;
  shadow-radius: 8px;
  shadow-offset: 0px 4px;
  elevation: 4;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 12px;
`;

const IconWrapper = styled.View`
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

// Additional Info Section
const InfoSection = styled.View`
  margin-top: 16px;
  padding: 16px;
  background-color: ${colors.highlight};
  border-radius: 16px;
`;

const InfoText = styled.Text`
  font-size: 14px;
  color: ${colors.textSecondary};
  text-align: center;
  line-height: 20px;
`;

export default function Home() {
  const router = useRouter();

  const buttons = [
    { 
      title: "Babysitter Dashboard", 
      route: "/components/BabySitterDashboard",
      icon: <FontAwesome5 name="user-nurse" size={20} color="white" />,
      primary: true
    },
    { 
      title: "Emergency Protocols", 
      route: "/components/EmergencyProtocolsScreen",
      icon: <Ionicons name="warning" size={20} color="white" />,
      emergency: true
    },
    { 
      title: "Parent Resources", 
      route: "/components/ParentResources",
      icon: <MaterialIcons name="family-restroom" size={20} color="white" />,
      secondary: true
    }
  ];

  return (
    <Container contentContainerStyle={{ paddingBottom: 40 }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Brand Header */}
      <BrandHeader>
        <BrandLogo 
          source={require('./assets/images/MomTech_Image.png')} 
          onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
        />
        <BrandTagline>Trusted Childcare for Modern Families</BrandTagline>
      </BrandHeader>

      {/* Main Header */}
      <HeaderContainer>
        <Header>Babysitter Allocation</Header>
        <SubHeader>
          Connect with certified, background-checked babysitters in your area
        </SubHeader>
      </HeaderContainer>

      {/* Stats Cards */}
      <StatsContainer>
        <StatCard>
          <StatValue>200+</StatValue>
          <StatLabel>Certified Sitters</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>98%</StatValue>
          <StatLabel>Satisfaction Rate</StatLabel>
        </StatCard>
      </StatsContainer>

      {/* Feature Card */}
      <FeatureCard>
        <FeatureText>
          Our platform connects you with experienced caregivers who have passed rigorous background checks and training programs.
        </FeatureText>
      </FeatureCard>

      {/* Action Buttons */}
      <ButtonGrid>
        {buttons.map((button, index) => (
          <Button
            key={index}
            onPress={() => router.push(button.route)}
            activeOpacity={0.8}
            emergency={button.emergency}
            secondary={button.secondary}
          >
            <IconWrapper>
              {button.icon}
            </IconWrapper>
            <ButtonText>{button.title}</ButtonText>
          </Button>
        ))}
      </ButtonGrid>

      {/* Additional Info */}
      <InfoSection>
        <InfoText>
          Need help? Contact our support team anytime at support@momtech.com
        </InfoText>
      </InfoSection>
    </Container>
  );
}