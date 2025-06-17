// hooks/useUserContent.ts
import { useContent } from "@/actions/editorActions"
import { ActionItemType, DesignType, useUserContentStore } from "@/stores/useContentStore"
import { useEffect, useState } from "react"

type TogglesType = {
  profileImage: boolean
  profileName: boolean
  verifiedBadge: boolean
  bio: boolean
  heading: boolean
}

export function useUserContent() {

//   const [profileData, setProfileData] = useState<ProfileDataType>({
//     name: "Benjamin",
//     bio: "Content Creator",
//     profileImage: "",
//     coverImage: null,
//     isVerified: false,
//     showHeading: false,
//     profile:{
//       templateId:""
//     }
//   })
  // const setProfileData = useUserContentStore((state) => state.setProfileData)
  // const { initializeStore, loading, setLoading } = useUserContentStore();

  // const [toggles, setToggles] = useState<TogglesType>({
  //   profileImage: true,
  //   profileName: true,
  //   verifiedBadge: false,
  //   bio: true,
  //   heading: false,
  // })

  // useEffect(() => {
  //   const fetchContent = async () => {
  //     try {
  //       const content = await useContent();
  //       if (content) {
  //         initializeStore({
  //           templateId:content.profile.templateId || "minimal",
  //           content: content.profile.content ?? {
  //             id: "",
  //             profileId: "",
  //             profileName: "Benjamin",
  //             profileBio: "Content Creator",
  //             profilePicture: "",
  //             coverImage: null,
  //             profileVerified: false,
  //           },
  //           design: content.profile.design as DesignType ?? {
  //             layout: "default",
  //             background: "#ffffff",
  //             color: "#000000",
  //             font: "Inter",
  //           },
  //           actionItems: (content.profile.actionItems || []).map((item) => ({
  //             ...item,
  //             type: item.type as "LINK_LIST" | "OTHER_ACTION",
  //             config: item.config as ActionItemType["config"],
  //           })),
  //         });
  //         // setProfileData({
  //         //   name: content.profileName || "Benjamin",
  //         //   bio: content.profileBio || "Content Creator",
  //         //   profileImage: String(content.profilePicture) || "",
  //         //   coverImage: null,
  //         //   isVerified: content.profileVerified || false,
  //         //   showHeading: false,
  //         //   profile:{
  //         //     templateId:content.profile.templateId || ""
  //         //   }
  //         // })
  //       }
  //     } catch (error) {
  //       console.error("Error fetching content:", error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchContent()
  // }, [])

  // return {
  //   loading,
  //   // profileData,
  //   // setProfileData,
  //   toggles,
  //   setToggles,
  // }
}