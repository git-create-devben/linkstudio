interface FormDataType {
    username: string;
    goal: string;
    template: string;
    platforms: string[];
    links: string[];
    displayName: string;
    bio: string;
    profileImage: File | null;
  
  }

  interface ProfileProps {
    id: string
    username: string 
    email: string
    profileImageUrl: string
    createdAt: string
} 