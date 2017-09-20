package com.xlj.myreactapp.web.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Paths;
@Component
public class RouterRewriteFilter implements Filter {

    private static String TEMP_INDEX_HTML = null;

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    public RouterRewriteFilter() {
        TEMP_INDEX_HTML = getTemp();
    }

    @Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain chain) throws IOException, ServletException {

		arg0.setCharacterEncoding("UTF-8");
		arg1.setContentType("text/html;charset=UTF-8");

		HttpServletRequest request = (HttpServletRequest)arg0;
		HttpServletResponse response = (HttpServletResponse)arg1;
		String requestUrl = request.getRequestURI();

        if(requestUrl.contains("/admin/audits")){
            out(response);
        }
        chain.doFilter(request, response);
	}

    private String getTemp() {
        BufferedReader br = null;
        try {
            br = new BufferedReader(new FileReader(resolvePathPrefix() + "target/www/index.html"));
            StringBuilder sb = new StringBuilder();
            String line = br.readLine();
            while (line != null) {
                sb.append(line);
                sb.append(System.lineSeparator());
                line = br.readLine();
            }
            return sb.toString();
        } catch (IOException e) {
            log.error("getTemp error", e);
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    log.error("close error", e);
                }
            }
        }
        return null;
    }

    private void out(HttpServletResponse response){
        if(TEMP_INDEX_HTML == null){
            TEMP_INDEX_HTML = getTemp();
        }
        PrintWriter out = null;
        try {
            response.setContentType("text/html");
            out = response.getWriter();
            out.print(TEMP_INDEX_HTML);
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if(out!=null){
                out.close();
            }
        }
    }

    /**
     *  Resolve path prefix to static resources.
     */
    private String resolvePathPrefix() {
        String fullExecutablePath = this.getClass().getResource("").getPath();
        String rootPath = Paths.get(".").toUri().normalize().getPath();
        String extractedPath = fullExecutablePath.replace(rootPath, "");
        int extractionEndIndex = extractedPath.indexOf("target/");
        if(extractionEndIndex <= 0) {
            return "";
        }
        return extractedPath.substring(0, extractionEndIndex);
    }

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	@Override
	public void destroy() {

	}
}
