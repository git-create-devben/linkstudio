"use client"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from 'react';
import { prisma } from "../prismaClient";

// export const getUser = async () => {
//     const supabase = createClient()
//     const {data:{user}, error} = await supabase.auth.getUser()
//     const userId = user?.id
//     return {
//         error,
//         user,
//         supabase,
//         userId
//     }
// }


export function getSupabaseId() {
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const supabase = createClient()
  useEffect(() => {
    const fetchUserId = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user && !error) {
        setUserId(user.id);
      }
      setLoading(false);
    };

    fetchUserId();
  }, []);

  return { userId, loading };
}


