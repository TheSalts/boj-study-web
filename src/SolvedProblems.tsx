import React, { useEffect, useState } from "react";
import axios from "axios";

interface Username {
  name: string;
}

interface Problem {
  problemId: number;
  titleKo: string;
  level: number;
  averageTries: number;
}

interface UserData {
  solved: Problem[];
  unsolved: Problem[];
}

const baseUrl =
  "https://port-0-boj-study-server-m2ysdjnxabf30e95.sel4.cloudtype.app";

const tiers: { tier: number; name: string; rating: number; class: string }[] = [
  { tier: 0, name: "Unrated", rating: 0, class: "tier-unrated" },
  { tier: 1, name: "Bronze V", rating: 30, class: "tier-bronze" },
  { tier: 2, name: "Bronze IV", rating: 60, class: "tier-bronze" },
  { tier: 3, name: "Bronze III", rating: 90, class: "tier-bronze" },
  { tier: 4, name: "Bronze II", rating: 120, class: "tier-bronze" },
  { tier: 5, name: "Bronze I", rating: 150, class: "tier-bronze" },
  { tier: 6, name: "Silver V", rating: 200, class: "tier-silver" },
  { tier: 7, name: "Silver IV", rating: 300, class: "tier-silver" },
  { tier: 8, name: "Silver III", rating: 400, class: "tier-silver" },
  { tier: 9, name: "Silver II", rating: 500, class: "tier-silver" },
  { tier: 10, name: "Silver I", rating: 650, class: "tier-silver" },
  { tier: 11, name: "Gold V", rating: 800, class: "tier-gold" },
  { tier: 12, name: "Gold IV", rating: 950, class: "tier-gold" },
  { tier: 13, name: "Gold III", rating: 1100, class: "tier-gold" },
  { tier: 14, name: "Gold II", rating: 1250, class: "tier-gold" },
  { tier: 15, name: "Gold I", rating: 1400, class: "tier-gold" },
  { tier: 16, name: "Platinum V", rating: 1600, class: "tier-platinum" },
  { tier: 17, name: "Platinum IV", rating: 1750, class: "tier-platinum" },
  { tier: 18, name: "Platinum III", rating: 1900, class: "tier-platinum" },
  { tier: 19, name: "Platinum II", rating: 2000, class: "tier-platinum" },
  { tier: 20, name: "Platinum I", rating: 2100, class: "tier-platinum" },
  { tier: 21, name: "Diamond V", rating: 2200, class: "tier-diamond" },
  { tier: 22, name: "Diamond IV", rating: 2300, class: "tier-diamond" },
  { tier: 23, name: "Diamond III", rating: 2400, class: "tier-diamond" },
  { tier: 24, name: "Diamond II", rating: 2500, class: "tier-diamond" },
  { tier: 25, name: "Diamond I", rating: 2600, class: "tier-diamond" },
  { tier: 26, name: "Ruby V", rating: 2700, class: "tier-ruby" },
  { tier: 27, name: "Ruby IV", rating: 2800, class: "tier-ruby" },
  { tier: 28, name: "Ruby III", rating: 2850, class: "tier-ruby" },
  { tier: 29, name: "Ruby II", rating: 2900, class: "tier-ruby" },
  { tier: 30, name: "Ruby I", rating: 2950, class: "tier-ruby" },
  { tier: 31, name: "Master", rating: 3000, class: "tier-master" },
];
function getTier(tier: number): {
  tier: number;
  name: string;
  rating: number;
  class: string;
} {
  if (tier >= 0 && tier < tiers.length) {
    return tiers[tier];
  }
  return tiers[0];
}
const SolvedProblems: React.FC<Username> = ({ name }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  //   let solvedProblemsInStudy = 0;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/users/solved`, {
          withCredentials: true,
          params: { username: name },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [name]);

  if (!userData) {
    return (
      <div style={{ color: "#8a8f95" }}>
        <i>불러오는 중...</i>
      </div>
    );
  }
  userData.solved.sort((a, b) => {
    if (a.level !== b.level) {
      return b.level - a.level;
    }
    if (a.averageTries !== b.averageTries) {
      return b.averageTries - a.averageTries;
    }
    return a.problemId - b.problemId;
  });

  userData.unsolved.sort((a, b) => {
    if (a.level !== b.level) {
      return b.level - a.level;
    }
    if (a.averageTries !== b.averageTries) {
      return b.averageTries - a.averageTries;
    }
    return a.problemId - b.problemId;
  });

  return (
    <div>
      <div className="problem-info">
        스터디에서 {`${userData.solved.length}`} 문제 해결
        <div className="problem-solved">
          {userData.solved.map((problem) => (
            <a
              key={problem.problemId}
              href={`https://www.acmicpc.net/problem/${problem.problemId}`}
              className={getTier(problem.level).class}
              title={getTier(problem.level).name}
              target="_blank"
              rel="noreferrer"
            >
              {problem.problemId}{" "}
            </a>
          ))}
        </div>
      </div>
      <div className="problem-info">
        스터디에서 {`${userData.unsolved.length}`} 문제 미해결
        <div className="problem-solved">
          {userData.unsolved.map((problem) => (
            <a
              key={problem.problemId}
              href={`https://www.acmicpc.net/problem/${problem.problemId}`}
              className={getTier(problem.level).class}
              title={getTier(problem.level).name}
              target="_blank"
              rel="noreferrer"
            >
              {problem.problemId}{" "}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolvedProblems;
