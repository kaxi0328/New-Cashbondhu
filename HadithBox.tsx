import { useMemo } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const hadithCollection = [
  { text: "যে ব্যক্তি আল্লাহ ও পরকালে বিশ্বাস রাখে, সে যেন ভালো কথা বলে অথবা চুপ থাকে।", source: "বুখারী ও মুসলিম" },
  { text: "তোমাদের মধ্যে সর্বোত্তম সেই ব্যক্তি যে কুরআন শিখে এবং শেখায়।", source: "বুখারী" },
  { text: "প্রত্যেক ভালো কাজই সদকা।", source: "বুখারী ও মুসলিম" },
  { text: "আল্লাহ তাআলা দয়ালু, তিনি দয়া পছন্দ করেন।", source: "মুসলিম" },
  { text: "তোমরা একে অপরকে সালাম দাও, খাদ্য খাওয়াও, আত্মীয়তার সম্পর্ক রক্ষা করো এবং রাতে নামাজ পড়ো যখন মানুষ ঘুমিয়ে থাকে।", source: "তিরমিযী" },
  { text: "যে ব্যক্তি মানুষের প্রতি কৃতজ্ঞ নয়, সে আল্লাহর প্রতিও কৃতজ্ঞ নয়।", source: "তিরমিযী" },
  { text: "দুনিয়া মুমিনের কারাগার আর কাফেরের জান্নাত।", source: "মুসলিম" },
  { text: "হাসিমুখে তোমার ভাইয়ের সাথে সাক্ষাৎ করা সদকা।", source: "তিরমিযী" },
  { text: "জান্নাত মায়ের পায়ের নিচে।", source: "নাসাঈ" },
  { text: "ধৈর্য আলোকবর্তিকা।", source: "মুসলিম" },
  { text: "সবচেয়ে উত্তম জিকির হলো 'লা ইলাহা ইল্লাল্লাহ'।", source: "তিরমিযী" },
  { text: "তোমরা রাগ করো না।", source: "বুখারী" },
];

const duaCollection = [
  { text: "রাব্বানা আতিনা ফিদ্দুনিয়া হাসানাতাওঁ ওয়া ফিল আখিরাতি হাসানাতাওঁ ওয়া ক্বিনা আযাবান নার।", meaning: "হে আমাদের রব! আমাদের দুনিয়ায় কল্যাণ দাও এবং আখিরাতেও কল্যাণ দাও এবং আগুনের আযাব থেকে রক্ষা করো।" },
  { text: "আল্লাহুম্মা ইন্নী আসআলুকাল হুদা ওয়াত তুক্বা ওয়াল আফাফা ওয়াল গ্বিনা।", meaning: "হে আল্লাহ! আমি তোমার কাছে হেদায়েত, তাকওয়া, পবিত্রতা ও অভাবমুক্তি চাই।" },
  { text: "রাব্বি যিদনী ইলমা।", meaning: "হে আমার রব! আমার জ্ঞান বৃদ্ধি করে দাও।" },
  { text: "লা ইলাহা ইল্লা আনতা সুবহানাকা ইন্নী কুনতু মিনায যালিমীন।", meaning: "তুমি ছাড়া কোনো ইলাহ নেই, তুমি পবিত্র। নিশ্চয়ই আমি জালিমদের অন্তর্ভুক্ত।" },
  { text: "আল্লাহুম্মা ইন্নাকা আফুউন তুহিব্বুল আফওয়া ফা'ফু আন্নী।", meaning: "হে আল্লাহ! তুমি ক্ষমাশীল, ক্ষমা পছন্দ করো, আমাকে ক্ষমা করো।" },
  { text: "হাসবুনাল্লাহু ওয়া নি'মাল ওয়াকীল।", meaning: "আল্লাহই আমাদের জন্য যথেষ্ট এবং তিনি কতই না উত্তম কর্মবিধায়ক।" },
];

const HadithBox = () => {
  const { hadith, dua } = useMemo(() => {
    // Change every 12 hours
    const halfDayIndex = Math.floor(Date.now() / (12 * 60 * 60 * 1000));
    const hIdx = halfDayIndex % hadithCollection.length;
    const dIdx = halfDayIndex % duaCollection.length;
    return { hadith: hadithCollection[hIdx], dua: duaCollection[dIdx] };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card rounded-2xl shadow-card p-4 mb-4 border border-emerald-500/20"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
          <BookOpen size={16} className="text-emerald-500" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">আজকের হাদিস ও দুআ</h3>
      </div>

      {/* Hadith */}
      <div className="mb-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
        <p className="text-xs font-medium text-emerald-500 mb-1">📖 হাদিস</p>
        <p className="text-sm text-foreground leading-relaxed">"{hadith.text}"</p>
        <p className="text-xs text-muted-foreground mt-1">— {hadith.source}</p>
      </div>

      {/* Dua */}
      <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
        <p className="text-xs font-medium text-emerald-500 mb-1">🤲 দুআ</p>
        <p className="text-sm text-foreground leading-relaxed font-medium">{dua.text}</p>
        <p className="text-xs text-muted-foreground mt-1">{dua.meaning}</p>
      </div>
    </motion.div>
  );
};

export default HadithBox;
