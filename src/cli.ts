import {
  args,
  Choice,
  EarlyExitFlag,
  FiniteNumber,
  Integer,
  MAIN_COMMAND,
  Option,
  PARSE_FAILURE,
  PartialOption,
  Text,
} from "https://deno.land/x/args@2.1.1/index.ts";

// See: https://github.com/KSXGitHub/deno_run_tests_on_localhost/blob/0.2.2/cli.ts

// === Command Line Interface Arguments ===
// --envfile string - path to env file (default: .env)
// --help string - show help
// --since string - date string (YYYY-MM-DD)
// --until string - date string (YYYY-MM-DD)
// --nrepos int - limit number of repos to crawl (default: No limit)
// --ncommits int - limit number of commits for each repo to crawl (default: No limit)

export type CliArgs = {
  envfile: string;
  help: string;
  since: string;
  until: string;
  nrepos: number;
  ncommits: number;
};

export class Cli {
  private readonly parser: any;
  private readonly parserRes: any;
  // --------------------------
  // Arguments
  // --------------------------
  private arguments: CliArgs = {
    help: "",
    envfile: "",
    since: "",
    until: "",
    nrepos: 0,
    ncommits: 0,
  };

  // ==========================
  // Public methods
  // ==========================
  public constructor(inputArgs: string[]) {
    // Create and define parser
    this.parser = args
      .describe("Git Repository Crawling Dog")
      .with(EarlyExitFlag("help", { // --help
        alias: ["h", "?"],
        describe: "Show help",
        exit() {
          console.log("USAGE");
          console.log("  $ deno run src/cli.ts [OPTIONS]");
          return Deno.exit(0);
        },
      }))
      .with(PartialOption("envfile", { // --envfile
        alias: ["e"],
        describe: "Path to env file (default: .env)",
        type: Text,
        default: ".env",
      }))
      .with(PartialOption("since", { // --since
        alias: ["s"],
        describe: "from Date string (YYYY-MM-DD)",
        type: Text,
        default: "",
      }))
      .with(PartialOption("until", { // --until
        alias: ["u"],
        describe: "to Date string (YYYY-MM-DD)",
        type: Text,
        default: "",
      }))
      .with(PartialOption("nrepos", { // --nrepos
        alias: ["r"],
        describe: "Limit number of repos to crawl (default: No limit)",
        type: FiniteNumber,
        default: 0,
      }))
      .with(PartialOption("ncommits", { // --ncommits
        alias: ["c"],
        describe:
          "limit number of commits for each repo to crawl (default: No limit)",
        type: FiniteNumber,
        default: 0,
      }));

    // Parse input arguments
    this.parserRes = this.parser.parse(inputArgs);

    // Set arguments
    this.arguments = { ...this.parserRes.value };

    // Check arguments
    if (!this.checkArgs(this.arguments)) {
      console.log("ERROR: Invalid arguments");
      Deno.exit(1);
    }
  }

  private checkArgs(args: CliArgs): boolean {
    if (args.nrepos < 0) {
      console.error("nrepos must be >= 0");
      return false;
    }
    if (args.ncommits < 0) {
      console.error("ncommits must be >= 0");
      return false;
    }
    return true;
  }

  public getEnvFilePath(): string {
    return this.arguments.envfile;
  }

  public getSince(): string {
    return this.arguments.since;
  }

  public getUntil(): string {
    return this.arguments.until;
  }

  public getNRepos(): number {
    return this.arguments.nrepos;
  }

  public getNCommits(): number {
    return this.arguments.ncommits;
  }

  public getArguments(): CliArgs {
    return this.arguments;
  }

  public static async main(): Promise<void> {
  }
}
