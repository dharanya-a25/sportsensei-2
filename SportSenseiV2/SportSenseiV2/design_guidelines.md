# SportSensei Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from accessible fitness and educational platforms like Nike Training Club and Coursera, focusing on inclusive design and clear visual hierarchy for diverse user needs.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Main brand: 220 85% 65% (vibrant blue for trust and accessibility)
- Success/feedback: 142 76% 47% (green for positive reinforcement)
- Warning/attention: 38 92% 50% (orange for important actions)

**Dark Mode:**
- Background: 222 84% 5% (deep blue-black)
- Surface: 220 14% 11% (elevated surfaces)
- Text primary: 210 40% 95% (high contrast white)

**Light Mode:**
- Background: 0 0% 100% (pure white)
- Surface: 220 14% 96% (light gray surfaces)
- Text primary: 222 84% 5% (dark blue-black)

### B. Typography
- **Primary Font**: Inter (Google Fonts) - excellent accessibility and readability
- **Headings**: 600-700 weight, larger sizes (text-2xl to text-4xl)
- **Body**: 400-500 weight, comfortable reading sizes (text-base to text-lg)
- **UI Elements**: 500-600 weight for buttons and labels

### C. Layout System
**Spacing Units**: Tailwind units of 4, 6, 8, and 12
- Consistent spacing: p-4, m-6, gap-8, py-12
- Component padding: p-6 for cards, p-4 for buttons
- Section spacing: mb-12 between major sections

### D. Component Library

**Navigation:**
- Clean horizontal nav with category indicators
- Accessible hamburger menu for mobile
- High contrast focus states

**Forms & Inputs:**
- Large touch targets (min-h-12)
- Clear labels and error states
- File upload with drag-and-drop visual feedback
- Category selection with visual icons and clear descriptions

**Data Display:**
- Leaderboard cards with clear ranking hierarchy
- Video thumbnail grids with accessibility metadata
- Feedback cards with color-coded sentiment indicators

**Interactive Elements:**
- Primary buttons: Rounded corners (rounded-lg), solid backgrounds
- Secondary buttons: Outline variants with blurred backgrounds when over images
- Upload areas: Dashed borders with hover states
- Progress indicators for video processing

**Accessibility Features:**
- Screen reader optimized text
- High contrast mode toggle
- Keyboard navigation indicators
- Focus management for modal dialogs

### E. Layout Structure

**Hero Section:**
- Clean, welcoming header with app name and tagline
- Prominent "Get Started" CTA
- Brief explanation of inclusivity focus
- No large hero image - focus on functionality

**Main Interface:**
- Username entry modal with friendly copy
- Category selection with clear visual distinctions
- Video upload area with preview capabilities
- Dashboard layout with sidebar navigation for different sections

**Special Considerations:**
- Extra spacing around interactive elements for motor accessibility
- Color-blind friendly color combinations
- Text alternatives for all visual feedback
- Consistent navigation patterns across all views

## Visual Hierarchy
- **Primary Actions**: Bold, high-contrast buttons
- **Content Sections**: Clear card-based layouts with subtle shadows
- **Feedback Elements**: Color-coded with text descriptions
- **Navigation**: Breadcrumb-style progress indicators

## Accessibility Implementation
- WCAG 2.1 AA compliance minimum
- Screen reader friendly markup
- Keyboard navigation support
- High contrast mode compatibility
- Alternative text for all uploaded videos and images

This design system prioritizes inclusivity, accessibility, and clear functionality while maintaining a modern, encouraging aesthetic appropriate for a sports coaching platform.