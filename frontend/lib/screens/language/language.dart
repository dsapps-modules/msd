import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:provider/provider.dart';

import '../../config/icons.dart';
import '../../controller/provider/thyme_provider.dart';
import '../../l10n/app_localizations.dart';
import '../common_widgets/common_card.dart';

class LanguageSelectionScreen extends StatefulWidget {
  const LanguageSelectionScreen({super.key});

  @override
  LanguageSelectionScreenState createState() => LanguageSelectionScreenState();
}

class LanguageSelectionScreenState extends State<LanguageSelectionScreen> {
  double height = 10;

  bool isSelected(Locale current, Language language) {
    if (current.languageCode != language.locale) {
      return false;
    }

    if (current.countryCode == null || current.countryCode!.isEmpty) {
      return true;
    }

    return current.countryCode == language.countryCode;
  }

  @override
  Widget build(BuildContext context) {
    final languageProvider = Provider.of<ThemeProvider>(context);
    final List<Language> languages = [
      Language(
        name: AppLocalizations.of(context)!.arabic,
        flag: AssetsIcons.arFlag,
        locale: 'ar',
        countryCode: 'SA',
      ),
      Language(
        name: 'Português (Brasil)',
        flag: AssetsIcons.language,
        locale: 'pt',
        countryCode: 'BR',
      ),
      Language(
        name: AppLocalizations.of(context)!.english,
        flag: AssetsIcons.usFlag,
        locale: 'en',
        countryCode: 'US',
      ),
      Language(
        name: AppLocalizations.of(context)!.spanish,
        flag: AssetsIcons.spain,
        locale: 'es',
        countryCode: 'ES',
      ),
    ];
    height = languages.length * 50;
    return Scaffold(
      appBar: !kIsWeb
          ? AppBar(
              title: Text(
                AppLocalizations.of(context)!.changeLanguage,
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w500,
                      fontSize: kIsWeb ? 16 : 16.sp,
                    ),
              ),
              centerTitle: true,
            )
          : null,
      body: Column(
        children: [
          CommonCard(
            mHorizontal: kIsWeb ? 0 : 12,
            widget: SizedBox(
              height: kIsWeb ? height : height.h,
              child: ListView.builder(
                itemCount: languages.length,
                itemBuilder: (context, index) {
                  final language = languages[index];
                  final selected = isSelected(languageProvider.appLocale, language);
                  return GestureDetector(
                    onTap: () {
                      languageProvider.changeLanguage(
                        Locale(language.locale, language.countryCode),
                      );
                    },
                    child: Container(
                      padding: EdgeInsets.symmetric(
                        horizontal: kIsWeb ? 16 : 16.w,
                        vertical: kIsWeb ? 12 : 12.h,
                      ),
                      margin: EdgeInsets.only(bottom: kIsWeb ? 8 : 8.h),
                      decoration: BoxDecoration(
                        color: selected ? Colors.grey.shade100 : Colors.transparent,
                        borderRadius: BorderRadius.circular(kIsWeb ? 8 : 8.r),
                      ),
                      child: Row(
                        children: [
                          Image.asset(
                            language.flag,
                            height: kIsWeb ? 20 : 20.h,
                            width: kIsWeb ? 20 : 20.w,
                          ),
                          SizedBox(width: kIsWeb ? 12 : 12.w),
                          Expanded(
                            child: Text(
                              language.name,
                              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                    fontWeight: FontWeight.w500,
                                    color: selected ? Colors.black : Colors.grey,
                                    fontSize: kIsWeb ? 16 : 16.sp,
                                  ),
                            ),
                          ),
                          if (selected)
                            Icon(
                              Icons.check,
                              color: Colors.blue,
                              size: kIsWeb ? 20 : 20.sp,
                            ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
          SizedBox(height: kIsWeb ? 10 : 10.h),
        ],
      ),
    );
  }
}

class Language {
  final String name;
  final String flag;
  final String locale;
  final String countryCode;

  Language({
    required this.name,
    required this.flag,
    required this.locale,
    required this.countryCode,
  });
}
