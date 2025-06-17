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

  interface UserProps {
    id: string
    username: string 
    email: string
    profile: ProfileProps
    profileImageUrl: string
    createdAt: string
} 

interface ProfileProps {
  displayName: string;
  profileImageUrl: string;
}